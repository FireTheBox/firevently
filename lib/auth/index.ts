import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
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
    Discord,
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
          const { user } = await signInWithEmailAndPassword(authFirebase, email, password)

          if (!user.email) {
            return null;
          }

          const userDb = await getUserByEmail({ email })

          if (!userDb) {
            await createUser({
              username: user.displayName || email.split("@")[0].trim(),
              email,
              avatar: user.photoURL
            })
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