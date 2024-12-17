import { ObjectId } from "mongoose";

export interface IOrder extends Document {
  user: ObjectId;
  products: {
    product: string;
    quantity: number;
  }[];
  totalPrice: number;
}
