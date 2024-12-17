import { IProduct } from "./product.interface";

export interface IOrder {
  user: string;
  products: {
    product: IProduct;
    quantity: number;
  }[];
  totalPrice: number;
}
