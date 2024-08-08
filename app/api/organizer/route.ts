import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { organizerFormSchema } from "@/lib/organizer/organizer.definition";
import { createOrganizer, updateOrganizerById } from "@/lib/organizer/organizer.service";
import { handleError } from "@/lib/utils";

export async function POST(request: NextRequest) {
    const data = await request.json();
    let organizer: z.infer<typeof organizerFormSchema>;

    try {
        organizer = organizerFormSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        handleError(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const createdOrganizer = await createOrganizer(organizer);

    return NextResponse.json(
        {
            organizer: createdOrganizer.id
        },
        {
            status: 201
        }
    )
}

export async function PUT(request: NextRequest) {
    const { id, ...data } = await request.json();
    let organizer: z.infer<typeof organizerFormSchema>;

    try {
        organizer = organizerFormSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        handleError(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const updatedOrganizer = await updateOrganizerById(id, organizer);

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