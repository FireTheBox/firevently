import { Document } from 'mongoose';
import { z } from 'zod';

import { codaPageTypes } from '@/constants';

export interface ICodaPage {
    type: CodaPageType;
    url: string;
    tableId?: string;
    event: string;
}

export interface ICodaPageWithId extends ICodaPage {
    id: string;
}

export const codaPageFormSchema = z.object({
    type: z.enum(codaPageTypes),
    url: z.string().url(),
    tableId: z.optional(z.string()),
});

export const codaPageFormRequest = codaPageFormSchema.merge(z.object({
    event: z.string(),
}));

export type CodaPageDocument = Document & ICodaPage;

export type CodaPageType = typeof codaPageTypes[number];
