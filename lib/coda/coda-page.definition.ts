import { Document } from 'mongoose';
import { z } from 'zod';

export interface ICodaPage {
    type: 'Detalhes' | 'Projetos' | 'Cronograma' | 'Participants';
    url: string;
    tableId?: string;
    event: string;
}

export const codaPageFormSchema = z.object({
    type: z.enum(['Detalhes', 'Projetos', 'Cronograma', 'Participants']),
    url: z.string().url(),
    tableId: z.optional(z.string()),
    event: z.string(),
});

export type EventDocument = Document & ICodaPage;