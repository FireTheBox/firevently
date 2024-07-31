import { createUser } from "@/lib/actions/user/create-user.action";
import { auth } from "@/lib/auth/firebase";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectToDatabase();

    try {
        const { username, email, password } = await request.json();

        const userDb = await User.findOne({ email });

        if (userDb) {
            return NextResponse.json(
                {
                    error: "Este e-mail já está em uso."
                },
                {
                    status: 400
                }
            )
        }

        const userCreated = await createUserWithEmailAndPassword(auth, email, password);

        const result = await createUser({
            username,
            email,
            avatar: userCreated.user.photoURL
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