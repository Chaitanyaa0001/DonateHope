import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types";

const userschema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["donor", "funder"],
    required: [true, "Role is required"],
    index: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });



export default mongoose.model<IUser>("User", userschema);
