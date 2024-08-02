import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getParticipants } from "../coda/get-participants.action";
import { createUser } from "../database/actions/create-user.action";
import { getUserByEmail } from "../database/actions/get-user-by-email.action";
import { handleError } from "../utils";
import { auth as authFirebase } from './firebase/index';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    newUser: "/",
    signIn: "/sign-in",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = (credentials.email as string) || "";
        const password = (credentials.password as string) || "";

        try {
          let userDb = await getUserByEmail({ email })

          if (!userDb) {
            const participants = await getParticipants()

            let userCredentials: UserCredential;

            if (participants?.includes(email)) {
              userCredentials = await createUserWithEmailAndPassword(authFirebase, email, password)
            } else {
              userCredentials = await signInWithEmailAndPassword(authFirebase, email, password);

              if (!userCredentials.user.email) {
                return null;
              }
            }

            const { user } = userCredentials;

            const result = await createUser({
              username: user.displayName || email.split("@")[0].trim(),
              email,
              avatar: user.photoURL
            })

            if (!result) {
              return null;
            }

            userDb = result;
          }

          return {
            id: userDb?.userId,
            email: userDb?.email,
            name: userDb?.username,
            image: userDb?.avatar
          };
        } catch (error: any) {
          handleError(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET!,
  // adapter: FirestoreAdapter({
  //   credential: cert({
  //     projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
  //     clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
  //     privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  //   }),
  // }) as Adapter
})