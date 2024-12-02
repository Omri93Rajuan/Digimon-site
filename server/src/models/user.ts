import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "אנא הכנס אימייל תקין"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      match: [/^0[2-9]\d{7,8}$/, "אנא הכנס מספר טלפון תקין"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "default-avatar.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// מסתיר את הסיסמה כשמחזירים את המשתמש
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IUser>("User", userSchema);
