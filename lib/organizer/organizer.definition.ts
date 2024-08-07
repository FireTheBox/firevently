import { Document } from "mongoose";
import { z } from "zod";

export interface IOrganizer {
  name: string;
  logo: string;
  contact: string;
  events: string[];
}

export const organizerFormSchema = z.object({
  name: z.string(),
  logo: z.string().url(),
  contact: z.string(),
})

export type OrganizerDocument = Document & IOrganizer;