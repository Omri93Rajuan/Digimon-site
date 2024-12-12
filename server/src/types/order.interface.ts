import { ObjectId } from "mongoose";

export interface IOrder extends Document {
  user: string;
  products: {
    product: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
}
