import { NextRequest, NextResponse } from "next/server";

import { signIn } from "@/lib/auth";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            {
                error: "Email e senha são obrigatórios.",
            },
            {
                status: 400
            }
        )
    }

    const user = await signIn("credentials", { email, password, redirect: false });

    if (!user) {
        return NextResponse.json(
            {
                error: "Falha ao cadastrar o usuário.",
            },
            {
                status: 500
            }
        )
    }

    return NextResponse.json(
        {
            user
        },
        {
            status: 201
        }
    )
}