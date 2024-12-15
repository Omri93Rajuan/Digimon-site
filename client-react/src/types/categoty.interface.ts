import { ProductCategory } from "./categoryList";

export interface ICategory {
  name: ProductCategory;
  description?: string;
  createdAt?: Date;
}
