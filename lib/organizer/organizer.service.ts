import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../database';
import { IOrganizer, OrganizerDocument } from './organizer.definition';
import Organizer from './organizer.model';

export const createOrganizer = async (data: Omit<IOrganizer, "events">): Promise<OrganizerDocument> => {
    await connectToDatabase();
    const organizer = new Organizer({
        ...data,
        events: []
    });
    return await organizer.save();
};

export const getAllOrganizers = async (): Promise<OrganizerDocument[]> => {
    await connectToDatabase();
    return await Organizer.find().populate('events').exec();
};

export const updateOrganizerById = async (id: string, data: Partial<IOrganizer>): Promise<OrganizerDocument | null> => {
    await connectToDatabase();
    return await Organizer.findByIdAndUpdate(new ObjectId(id), data, { new: true }).populate('events').exec();
};


export const getOrganizersByEventId = async (eventId: string): Promise<OrganizerDocument[]> => {
    await connectToDatabase();
    return await Organizer.find({ events: new ObjectId(eventId) }).populate('events').exec();
};

export const getOrganizerById = async (id: string): Promise<OrganizerDocument | null> => {
    await connectToDatabase();
    return await Organizer.findById(new ObjectId(id)).populate('events').exec();
};