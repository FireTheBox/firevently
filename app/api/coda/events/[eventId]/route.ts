import { NextRequest, NextResponse } from 'next/server';

import { getCodaPagesByEventId } from "@/lib/coda/coda-page.sevice";

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {
    const { eventId } = params;

    if (!eventId) {
        return NextResponse.json(
            {
                error: "ID do evento é obrigatório"
            },
            {
                status: 400
            }
        )
    }

    const codaPages = await getCodaPagesByEventId(eventId);


    if (codaPages.length === 0) {
        return NextResponse.json(
            {
                error: "Evento não existe ou não há páginas do Coda para este evento."
            },
            {
                status: 400
            }
        )
    }

    return NextResponse.json(
        {
            codaPages: codaPages.map(codaPage => {
                return {
                    id: codaPage.id,
                    type: codaPage.type,
                    url: codaPage.url,
                    tableId: codaPage.tableId,
                    event: codaPage.event,
                }
            })
        },
        {
            status: 201
        }
    )
}