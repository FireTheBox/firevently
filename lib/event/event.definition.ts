import { Document } from "mongoose";
import { z } from "zod";

import { formatCurrency } from "../currency";

export interface IEvent {
    thumbnail: string;
    title: string;
    description: string;
    reward: string;
    startDate: Date;
    endDate: Date;
    registrationLink: string;
    registrationFee: number;
    communityInvitation: string;
    isFeatured: boolean;

    category: string;
    organizer: string;
    codaPages: string[];
}

const rewardSchema = z.string().transform((value) => {
    const num = Number(value);
    return isNaN(num) ? value : num;
}).refine((value) => {
    return typeof value === 'number' && value >= 0 || typeof value === 'string';
}, {
    message: 'O valor deve ser um número não negativo ou uma string válida',
}).transform((value) => {
    return typeof value === 'number' ? formatCurrency(value) : value;
});

export const eventFormSchema = z.object({
    thumbnail: z.string().url(),
    title: z.string(),
    description: z.string(),
    reward: rewardSchema,
    startDate: z.date(),
    endDate: z.date(),
    registrationLink: z.string().url(),
    registrationFee: z.coerce.number().nonnegative(),
    communityInvitation: z.string().url(),
    isFeatured: z.boolean(),
    category: z.string(),
    organizer: z.string(),
})

export const eventFormRequest = z.object({
    thumbnail: z.string().url(),
    title: z.string(),
    description: z.string(),
    reward: rewardSchema,
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    registrationLink: z.string().url(),
    registrationFee: z.coerce.number().nonnegative(),
    communityInvitation: z.string().url(),
    isFeatured: z.boolean(),
    categoryId: z.string(),
    organizerName: z.string(),
})

export type EventDocument = Document & IEvent;