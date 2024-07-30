import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Discord from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as authFirebase } from './firebase/index';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
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

        return await signInWithEmailAndPassword(authFirebase, email, password)
          .then(userCredential => {
            return userCredential.user ?? null;
          })
      },
    }),],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  }) as Adapter
})