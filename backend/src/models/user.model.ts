import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
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
    password: {
      type: String,
      required: function () {
        return this.role === "admin";
      },
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: [true, "Role is required"],
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
 
userSchema.pre("save", async function (next) {
  const user = this as mongoose.Document & IUser & { isModified: (path: string) => boolean };
  if (!user.isModified("password") || !user.password) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err as any);
  }
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
