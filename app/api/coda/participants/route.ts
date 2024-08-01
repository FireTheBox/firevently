import { getParticipants } from "@/lib/coda/get-participants.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const participants = await getParticipants()

    if (!participants) {
        return NextResponse.json(
            {
                error: "Falha ao obter os participantes do evento."
            },
            {
                status: 502
            }
        )
    }

    return NextResponse.json(
        {
            "participants": participants,
        },
        {
            status: 200,
        }
    )
}