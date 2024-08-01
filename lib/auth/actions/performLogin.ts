"use server";

import { signIn } from "@/lib/auth";
import { handleError } from "@/lib/utils";

export const performLogin = async (email: string, password: string) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return true;
    } catch (error: any) {
        handleError(error);
        return false;
    }
}