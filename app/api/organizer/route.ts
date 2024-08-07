import { NextRequest, NextResponse } from "next/server";

import { createOrganizer, updateOrganizerById } from "@/lib/organizer/organizer.service";

export async function POST(request: NextRequest) {
    const { name, logo, contact } = await request.json();

    if (!name || !logo || !contact) {
        return NextResponse.json(
            {
                error: "'name', 'logo' e 'contact' são campos obrigatórios"
            },
            {
                status: 400
            }
        )
    }

    const organizer = await createOrganizer({ name, logo, contact });

    return NextResponse.json(
        {
            organizer: organizer.id
        },
        {
            status: 201
        }
    )
}

export async function PUT(request: NextRequest) {
    const { id, name, logo, contact } = await request.json();

    if (!id || !name || !logo || !contact) {
        return NextResponse.json(
            {
                error: "'id', 'name', 'logo' e 'contact' são campos obrigatórios"
            },
            {
                status: 400
            }
        )
    }

    const updatedOrganizer = await updateOrganizerById(id, { name, logo, contact });

    if (!updatedOrganizer) {
        return NextResponse.json(
            {
                error: "Falha ao atualizar as informações do organizador",
            },
            {
                status: 500
            }
        )
    }

    return NextResponse.json(
        {
            organizer: updatedOrganizer.id
        },
        {
            status: 200
        }
    )
}