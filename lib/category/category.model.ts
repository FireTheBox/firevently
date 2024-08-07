import { Model, model, models, Schema } from "mongoose";

import { ICategory } from "./category.definition";

export type CategoryModel = Model<ICategory>;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const Category = models.Category || model<ICategory, CategoryModel>('Category', CategorySchema);

export default Category;