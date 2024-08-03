import { NextResponse } from "next/server";

import { signOut } from "@/lib/auth";
import { handleError } from "@/lib/utils";

export async function POST() {
    try {
        await signOut();
    } catch (error: any) {
        handleError(error);
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            })
    }
}