"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { findUserByEmail } from '@/lib/user/find-by-email.action';
import { handleError } from '@/lib/utils';

import { connectToDatabase } from '../index';
import Event from '../models/event.model';

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

        const organizer = await findUserByEmail(userEmail);

        if (!organizer) {
            redirect("/");
        }

        const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: organizer.id })
        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error)
    }
}