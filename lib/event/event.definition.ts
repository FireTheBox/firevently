import { Document } from "mongoose";
import { z } from "zod";

export interface IEvent {
    thumbnail: string;
    title: string;
    description: string;
    reward: number;
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

export const eventFormSchema = z.object({
    thumbnail: z.string().url(),
    title: z.string(),
    description: z.string(),
    reward: z.coerce.number().nonnegative(),
    startDate: z.date(),
    endDate: z.date(),
    registrationLink: z.string().url(),
    registrationFee: z.coerce.number().nonnegative(),
    communityInvitation: z.string().url(),
    isFeatured: z.boolean(),
    category: z.string(),
    organizer: z.string(),
    // codaPages: z.array(z.string()),
})

export const eventFormRequest = z.object({
    thumbnail: z.string().url(),
    title: z.string(),
    description: z.string(),
    reward: z.coerce.number().nonnegative(),
    startDate: z.date(),
    endDate: z.date(),
    registrationLink: z.string().url(),
    registrationFee: z.coerce.number().nonnegative(),
    communityInvitation: z.string().url(),
    isFeatured: z.boolean(),
    categoryId: z.string(),
    organizerName: z.string(),
    // codaPages: z.array(z.string()),
})

export type EventDocument = Document & IEvent;