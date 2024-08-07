import { connectToDatabase } from '../database';
import CodaPage from './coda-page.modal';
import { CodaPage as CodaPageType } from './coda-page.type';

export const createCodaPage = async (data: CodaPageType): Promise<CodaPageType> => {
    await connectToDatabase();
    const codaPage = new CodaPage(data);
    return await codaPage.save();
};


export const getAllCodaPages = async (): Promise<CodaPageType[]> => {
    await connectToDatabase();
    return await CodaPage.find().populate('event').exec();
};

export const updateCodaPageById = async (id: string, data: Partial<CodaPageType>): Promise<CodaPageType | null> => {
    await connectToDatabase();
    return await CodaPage.findByIdAndUpdate(id, data, { new: true }).populate('event').exec();
};

export const deleteCodaPageById = async (id: string): Promise<CodaPageType | null> => {
    await connectToDatabase();
    return await CodaPage.findByIdAndDelete(id).populate('event').exec();
};

export const getCodaPagesByEventId = async (eventId: string): Promise<CodaPageType[]> => {
    await connectToDatabase();
    return await CodaPage.find({ event: eventId }).populate('event').exec();
};
