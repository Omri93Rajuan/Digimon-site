import { model, Schema } from "mongoose";
import { ProductCategory } from "../types/categoryList";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      enum: Object.values(ProductCategory),
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model("Category", CategorySchema);
