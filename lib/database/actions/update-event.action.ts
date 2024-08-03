"use server";

import { revalidatePath } from "next/cache"

import { handleError } from "@/lib/utils"

import { connectToDatabase } from ".."
import Event from "../models/event.model"
import { getUserByEmail } from "./get-user-by-email.action"

export interface UpdateEventParams {
    userEmail: string
    event: {
        _id: string
        title: string
        imageUrl: string
        description: string
        location: string
        startDateTime: Date
        endDateTime: Date
        categoryId: string
        price: string
        isFree: boolean
        reward: string
        url: string
    }
    path: string
}


export async function updateEvent({ userEmail, event, path }: UpdateEventParams) {
    try {
        await connectToDatabase()

        const eventToUpdate = await Event.findById(event._id)

        const organizer = await getUserByEmail({ email: userEmail })

        if (!eventToUpdate || eventToUpdate.organizer.toString() !== organizer?.userId) {
            throw new Error('Unauthorized or event not found')
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...event, category: event.categoryId },
            { new: true }
        )

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
        handleError(error)
    }
}