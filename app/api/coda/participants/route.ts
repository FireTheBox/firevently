import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pageId = "OY5gXjYYxk";
    const tableId = "grid-sync-10087-Submissions-dynamic-f5d937029f92425d01fe4f6efe8ecc96745d52ea67db90c5ac230747035cf737";
    const result = await fetch(`https://coda.io/apis/v1/docs/${pageId}/tables/${tableId}/rows`, {
        headers: {
            "Authorization": `Bearer ${process.env.CODA_API_TOKEN}`
        },
        next: {
            revalidate: 5 * 60
        }
    })

    const body = await result.json();

    if (!result.ok) {
        return NextResponse.json(
            {
                error: body.message
            },
            {
                status: 400
            }
        )
    }

    const participants = body.items;
    const emails = []

    for (const participant of participants) {
        const email = participant.values["c-Mvtyg7ekvt"]
        emails.push(email);
    }

    return NextResponse.json(
        {
            "participants": emails,
        },
        {
            status: 200,
        }
    )
}