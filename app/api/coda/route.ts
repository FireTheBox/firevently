import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { codaPageFormRequest } from "@/lib/coda/coda-page.definition";
import { createCodaPage, deleteCodaPageById } from "@/lib/coda/coda-page.sevice";
import { handleError } from "@/lib/utils";

export async function POST(request: NextRequest) {
    const data = await request.json();
    let codaPage: z.infer<typeof codaPageFormRequest>;

    try {
        codaPage = codaPageFormRequest.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        handleError(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    if (!codaPage) {
        return NextResponse.json(
            {
                error: "Todos os campos são obrigatórios."
            },
            {
                status: 400
            }
        )
    }

    const { type, url, tableId, event } = codaPage;

    const createdCodaPage = await createCodaPage({ type, url, tableId, event });

    return NextResponse.json(
        {
            codaPage: createdCodaPage.id
        },
        {
            status: 201
        }
    )
}

export async function DELETE(request: NextRequest) {
    const { pageId } = await request.json()

    if (!pageId) {
        return NextResponse.json(
            {
                error: "ID da página é obrigatório"
            },
            {
                status: 400
            }
        )
    }

    await deleteCodaPageById(pageId);

    return NextResponse.json(
        {},
        {
            status: 203
        }
    )
}