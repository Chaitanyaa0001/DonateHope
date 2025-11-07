import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const fullname = process.env.ADMIN_FULLNAME!;

  const existing = await User.findOne({ email }).exec();
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    email,
    fullname,
    password,
    role: "admin",
    isVerified: true,
  });

  console.log("✅ Admin created successfully!");
  process.exit(0);
};

createAdmin();
