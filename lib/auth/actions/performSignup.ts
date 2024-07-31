"use server";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function performSignUp(email: string, password: string) {
    await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}