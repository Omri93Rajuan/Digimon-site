import { ICategory } from "./categoty.interface";
export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: ICategory;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
