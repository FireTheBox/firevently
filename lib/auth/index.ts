import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { getParticipants } from "../coda/get-participants.action";
import { signInAction } from "../user/sign-in.action";
import { signUpAction } from "../user/sign-up.action";
import { handleError } from "../utils";

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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const user = await signInAction(email, password)

          if (user) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
            }
          }

          const participantsGaragem = await getParticipants("66aaa9252fb8f38e03a04fb9");
          
          if (!participantsGaragem?.includes(email)) {
            return null;
          }
          
          const participantsRIW24 = await getParticipants("66b3bdfa0d97c5415ee6c2be");

          if (!participantsRIW24?.includes(email)) {
            return null;
          }
          
          const newUser = await signUpAction(email, password, email.split("@").at(0)?.trim())

          if (!newUser) {
            return null
          }

          return {
            id: newUser.id,
            name: newUser.username,
            email: newUser.email,
          }
        } catch (error) {
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (trigger === "update" && session) {
        token = { ...token, user: session }
        return token;
      };


      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any

      return session;
    },
  },
  secret: process.env.AUTH_SECRET!,
})