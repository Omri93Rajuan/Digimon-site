import { ICategory } from "./categoty.interface";

export interface IProduct {
  _id?: string; // במונגוס ה-id יהיה מאונדקס אוטומטית
  name: string;
  description: string;
  price: number;
  category: ICategory;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
