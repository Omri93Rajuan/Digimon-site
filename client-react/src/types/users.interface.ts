export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  image?: string;
  orders: string;
  balance: number;
}
