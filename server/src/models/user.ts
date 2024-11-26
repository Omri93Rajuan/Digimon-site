import mongoose, { Document, Schema } from "mongoose";

// הממשק מגדיר את המבנה של המשתמש
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  image?: string; 
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  fullName: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    // תבנית בסיסית לבדיקת אימייל
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'אנא הכנס אימייל תקין']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    // תבנית פשוטה למספר טלפון ישראלי
    match: [/^0[2-9]\d{7,8}$/, 'אנא הכנס מספר טלפון תקין']
  },
  isAdmin: {
    type: Boolean,
    default: false  
  },
  image: {
    type: String,
    default: 'default-avatar.jpg'  
  }
}, {
  timestamps: true  
});

// מסתיר את הסיסמה כשמחזירים את המשתמש
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IUser>("User", userSchema);