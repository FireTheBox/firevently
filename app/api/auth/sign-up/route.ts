import { NextRequest, NextResponse } from "next/server";

import { signUpAction } from "@/lib/user/sign-up.action";

export async function POST(request: NextRequest) {
    const { email, password, username } = await request.json();

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

    const user = await signUpAction(email, password, username);

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