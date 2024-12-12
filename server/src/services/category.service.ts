import { handleBadRequest } from "../utils/ErrorHandle";
import { Category } from "../models/category";
import { ICategory } from "../types/categoty.interface";

const getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getCategoryById = async (categoryId: string) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addCategory = async (categoryData: ICategory) => {
  try {
    if (!categoryData.name) {
      throw new Error("Category name is required");
    }

    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateCategory = async (
  categoryId: string,
  updateData: Partial<ICategory>
) => {
  try {
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedCategory;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteCategory = async (categoryId: string) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    return { message: "Category deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
