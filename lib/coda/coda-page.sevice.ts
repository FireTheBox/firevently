import { ObjectId } from "mongodb";

import { connectToDatabase } from '../database';
import { ICodaPage } from './coda-page.definition';
import CodaPage from './coda-page.modal';

export const createCodaPage = async (data: ICodaPage): Promise<ICodaPage> => {
    await connectToDatabase();
    const codaPage = new CodaPage(data);
    return await codaPage.save();
};

export const getAllCodaPages = async (): Promise<ICodaPage[]> => {
    await connectToDatabase();
    return await CodaPage.find().populate('event').exec();
};

export const updateCodaPageById = async (id: string, data: Partial<ICodaPage>): Promise<ICodaPage | null> => {
    await connectToDatabase();
    return await CodaPage.findByIdAndUpdate(new ObjectId(id), data, { new: true }).populate('event').exec();
};

export const deleteCodaPageById = async (id: string): Promise<ICodaPage | null> => {
    await connectToDatabase();
    return await CodaPage.findByIdAndDelete(new ObjectId(id)).populate('event').exec();
};

export const getCodaPagesByEventId = async (eventId: string): Promise<ICodaPage[]> => {
    await connectToDatabase();
    return await CodaPage.find({ event: eventId }).populate('event').exec();
};
