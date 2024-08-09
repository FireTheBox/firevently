import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getCategoryById } from "@/lib/category/category.service";
import { eventFormRequest } from "@/lib/event/event.definition";
import { createEvent, updateEventById } from "@/lib/event/event.service";
import { getOrganizerByName, updateOrganizerById } from "@/lib/organizer/organizer.service";
import { handleError } from "@/lib/utils";

export async function POST(request: NextRequest) {
    let event: z.infer<typeof eventFormRequest>;

    try {
        const data = await request.json();

        event = eventFormRequest.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        handleError(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const { thumbnail,
        title,
        description,
        categoryId,
        communityInvitation,
        startDate,
        endDate,
        registrationLink,
        registrationFee,
        reward,
        isFeatured,
        organizerName } = event;

    const organizer = await getOrganizerByName(organizerName);

    if (!organizer) {
        return NextResponse.json(
            {
                error: "Organizador não existe."
            },
            {
                status: 400
            }
        )
    }

    const category = await getCategoryById(categoryId);

    if (!category) {
        return NextResponse.json(
            {
                error: "Categoria não existe."
            },
            {
                status: 400
            }
        )
    }

    const createdEvent = await createEvent({
        thumbnail,
        title,
        description,
        communityInvitation,
        startDate,
        endDate,
        registrationLink,
        registrationFee,
        reward,
        isFeatured,
        category: category.id,
        organizer: organizer.id,
    });

    const updatedOrganizer = await updateOrganizerById(
        organizer.id,
        { events: [...organizer.events, createdEvent.id] }
    )

    if (!updatedOrganizer) {
        return NextResponse.json(
            {
                error: "Não foi possível adicionar o novo evento no histórico do organizador."
            },
            {
                status: 500
            }
        )
    }

    return NextResponse.json(
        {
            event: createdEvent.id
        },
        {
            status: 201
        }
    )
}

export async function PUT(request: NextRequest) {
    let event: z.infer<typeof eventFormRequest>;
    let eventId: string;

    try {
        const { id, ...data } = await request.json();

        event = eventFormRequest.parse(data);
        eventId = id;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        handleError(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const { thumbnail,
        title,
        description,
        categoryId,
        communityInvitation,
        startDate,
        endDate,
        registrationLink,
        registrationFee,
        reward,
        isFeatured,
        organizerName } = event;

    const organizer = await getOrganizerByName(organizerName);

    if (!organizer) {
        return NextResponse.json(
            {
                error: "Organizador não existe."
            },
            {
                status: 400
            }
        )
    }

    const category = await getCategoryById(categoryId);

    if (!category) {
        return NextResponse.json(
            {
                error: "Categoria não existe."
            },
            {
                status: 400
            }
        )
    }

    const updatedEvent = await updateEventById(eventId, {
        thumbnail,
        title,
        description,
        communityInvitation,
        startDate,
        endDate,
        registrationLink,
        registrationFee,
        reward,
        isFeatured,
        category: category.id,
        organizer: organizer.id,
    });

    if (!updatedEvent) {
        return NextResponse.json(
            {
                error: "Falha ao atualizar as informações do evento",
            },
            {
                status: 500
            }
        )
    }

    return NextResponse.json(
        {
            event: updatedEvent.id
        },
        {
            status: 200
        }
    )
}