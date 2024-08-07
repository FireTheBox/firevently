import { Document } from "mongoose";
import { z } from "zod";

export interface ICategory {
  name: string;
}

export const categoryFormSchema = z.object({
  name: z.string(),
})

export type CategoryType = {
  id: string;
  name: string;
};

export type CategoryDocument = Document & ICategory;