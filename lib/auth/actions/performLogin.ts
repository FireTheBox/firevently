"use server";

import { signIn } from "@/lib/auth";

export const performLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
    });

    return (result as any).ok as boolean;
}