import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getCategoryById } from "@/lib/category/category.service";
import { eventFormRequest } from "@/lib/event/event.definition";
import { createEvent, updateEventById } from "@/lib/event/event.service";
import { getOrganizerByName, updateOrganizerById } from "@/lib/organizer/organizer.service";
import { handleError } from "@/lib/utils";

export async function POST(request: NextRequest) {
    let data;

    try {
        const {
            thumbnail,
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
            organizerName
        } = await request.json();

        data = eventFormRequest.parse({
            thumbnail,
            title,
            description,
            categoryId,
            communityInvitation,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            registrationLink,
            registrationFee,
            reward,
            isFeatured,
            organizerName
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return NextResponse.json({ errors: error.errors }, { status: 400 });
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
        organizerName } = data;

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

    const event = await createEvent({
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
        { events: [...organizer.events, event.id] }
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
            event: event.id
        },
        {
            status: 201
        }
    )
}

export async function PUT(request: NextRequest) {
    const {
        id,
        thumbnail,
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
        organizerName
    } = await request.json();

    if ([id,
        thumbnail,
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
        organizerName].some(value => Boolean(value) === false)) {
        return NextResponse.json(
            {
                error: "Todos os campos são campos obrigatórios"
            },
            {
                status: 400
            }
        )
    }

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

    const updatedEvent = await updateEventById(id, {
        thumbnail,
        title,
        description,
        communityInvitation,
        startDate: new Date(Date.parse(startDate)),
        endDate: new Date(Date.parse(endDate)),
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