import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pageId = "YRo7SuUISP";
    const tableId = "grid-ROLloJcPZR";
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

    return NextResponse.json(
        {
            "projects": body.items.length,
        },
        {
            status: 200,
        }
    )
}