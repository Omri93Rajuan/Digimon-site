import { ObjectId } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image?: string;
  orders: ObjectId;
  balance: number;
}
