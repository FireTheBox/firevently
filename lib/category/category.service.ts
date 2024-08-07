import { ObjectId } from "mongodb";

import { connectToDatabase } from '../database';
import { CategoryDocument, ICategory } from './category.definition';
import Category from './category.model';

export const createCategory = async (data: ICategory): Promise<CategoryDocument> => {
    await connectToDatabase();
    const category = new Category(data);
    return await category.save();
};

export const getAllCategories = async (): Promise<CategoryDocument[]> => {
    await connectToDatabase();
    return await Category.find().exec();
};

export const getCategoryById = async (id: string): Promise<CategoryDocument | null> => {
    await connectToDatabase();
    return await Category.findById(new ObjectId(id)).exec();
};

export const getCategoryByName = async (name: string): Promise<CategoryDocument | null> => {
    await connectToDatabase();
    return await Category.findOne({ name }).exec();
};

export const updateCategoryById = async (id: string, data: Partial<ICategory>): Promise<CategoryDocument | null> => {
    await connectToDatabase();
    return await Category.findByIdAndUpdate(new ObjectId(id), data, { new: true }).exec();
};

export const deleteCategoryById = async (id: string): Promise<CategoryDocument | null> => {
    await connectToDatabase();
    return await Category.findByIdAndDelete(new ObjectId(id)).exec();
};
