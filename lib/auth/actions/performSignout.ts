"use server";

import { signOut } from "@/lib/auth";
import { handleError } from "@/lib/utils";

export const performSignOut = async () => {
    try {
        await signOut();

        return true;
    } catch (error: any) {
        handleError(error);
        return false;
    }
}