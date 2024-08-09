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
    const { pageId, currentPath } = await request.json()

    if (!pageId || !currentPath) {
        return NextResponse.json(
            {
                error: "Todos os campos são obrigatórios."
            },
            {
                status: 400
            }
        )
    }

    const codaPage = await deleteCodaPageById(pageId);

    if (!codaPage) {
        return NextResponse.json(
            {
                error: "Falha ao excluir a página do coda."
            },
            {
                status: 500
            }
        )
    }

    return NextResponse.json(
        {
            id: codaPage.id,
            type: codaPage.type,
            url: codaPage.url,
            tableId: codaPage.tableId,
            event: codaPage.event,
        },
        {
            status: 201
        }
    )
}