export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
