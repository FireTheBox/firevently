import { createUser } from "@/lib/actions/user/create-user.action";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const connection = await connectToDatabase();
    try {
        const { username, email, password, avatar } = await request.json();

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                {
                    error: "Este e-mail já está em uso."
                },
                {
                    status: 400
                }
            )
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const result = await createUser({
            username,
            email,
            password: hashedPassword,
            avatar
        })

        return NextResponse.json(
            {
                user: result
            },
            {
                status: 201
            }
        )
    } catch (error: any) {
        handleError(error);
        return NextResponse.json(
            {
                error: "Erro interno do servidor."
            },
            {
                status: 500
            }
        )
    }
}