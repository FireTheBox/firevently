import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../database';
import { handleError } from '../utils';
import { EventDocument, IEvent } from './event.definition';
import Event from './event.model';

export const createEvent = async (data: Omit<IEvent, "codaPages">): Promise<EventDocument> => {
    await connectToDatabase();
    const event = new Event(data);
    return await event.save();
};

export const getAllEvents = async ({
    query,
    limit = 6,
    page = 1,
    category
}: {
    query?: string;
    limit?: number;
    page?: number;
    category?: string;
}): Promise<{ data: EventDocument[]; totalPages: number }> => {
    try {
        await connectToDatabase();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
        const categoryCondition = category ? { category } : {};
        const conditions = {
            $and: [titleCondition, categoryCondition],
        };

        const skipAmount = (page - 1) * limit;
        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);

        const events = await eventsQuery
            .populate('category')
            .populate('organizer')
            .populate('codaPages')
            .exec();

        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: events,
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
        return { data: [], totalPages: 0 };
    }
};

export const getEventById = async (id: string): Promise<EventDocument | null> => {
    await connectToDatabase();
    return await Event.findById(new ObjectId(id))
        .populate('category')
        .populate('organizer')
        .populate('codaPages')
        .exec();
};

export const updateEventById = async (id: string, data: Partial<Omit<IEvent, "codaPages">>): Promise<EventDocument | null> => {
    await connectToDatabase();
    return await Event.findByIdAndUpdate(new ObjectId(id), data, { new: true })
        .populate('category')
        .populate('organizer')
        .populate('codaPages')
        .exec();
};

export const deleteEventById = async (id: string): Promise<EventDocument | null> => {
    await connectToDatabase();
    return await Event.findByIdAndDelete(new ObjectId(id))
        .populate('category')
        .populate('organizer')
        .populate('codaPages')
        .exec();
};

export const getEventsByOrganizer = async ({
    organizerId,
    limit = 6,
    page = 1
}: {
    organizerId: string;
    limit?: number;
    page?: number;
}): Promise<{ data: EventDocument[]; totalPages: number }> => {
    try {
        await connectToDatabase();

        const conditions = { organizer: organizerId };
        const skipAmount = (page - 1) * limit;

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);

        const events = await eventsQuery
            .populate('category')
            .populate('organizer')
            .populate('codaPages')
            .exec();

        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: events,
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
        return { data: [], totalPages: 0 }; 
    }
};

export const getRelatedEventsByCategory = async ({
    categoryId,
    eventId,
    limit = 3,
    page = 1
}: {
    categoryId: string;
    eventId: string;
    limit?: number;
    page?: number;
}): Promise<{ data: EventDocument[]; totalPages: number }> => {
    try {
        await connectToDatabase();

        const skipAmount = (page - 1) * limit;
        const conditions = {
            $and: [
                { category: categoryId },
                { _id: { $ne: eventId } }
            ]
        };

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);

        const events = await eventsQuery
            .populate('category')
            .populate('organizer')
            .populate('codaPages')
            .exec();

        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: events,
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
        return { data: [], totalPages: 0 };
    }
};

export const getFeaturedEvent = async (): Promise<EventDocument | null> => {
    try {
        await connectToDatabase();

        const event = await Event.findOne({ isFeatured: true })
            .sort({ createdAt: -1 })
            .populate('category')
            .populate('organizer')
            .populate('codaPages')
            .exec();

        return event;
    } catch (error) {
        handleError(error);
        return null;
    }
};