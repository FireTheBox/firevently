"use server";

import { revalidatePath } from 'next/cache';

import { handleError } from '@/lib/utils';

import { connectToDatabase } from '../index';
import Event from '../models/event.model';
import { getUserByEmail } from './get-user-by-email.action';

export interface CreateEventParams {
    userEmail: string
    event: {
        title: string
        description: string
        location: string
        imageUrl: string
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

export async function createEvent({ userEmail, event, path }: CreateEventParams) {
    try {
        await connectToDatabase()

        const organizer = await getUserByEmail({ email: userEmail })

        if (!organizer) throw new Error('Organizer not found')

        const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: organizer.userId })
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error)
    }
}