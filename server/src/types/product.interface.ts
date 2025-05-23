import { ObjectId } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: ObjectId;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
