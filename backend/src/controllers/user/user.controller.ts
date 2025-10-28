// src/controllers/admin.controller.ts
import { Request, Response } from "express";
import User from "../../models/user.model.js";
import Monitor from "../../models/monitor.model.js";
import redis from "../../config/redisClient.js";
import bcrypt from "bcrypt";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("email fullname role isVerified createdAt");
     return res.status(200).json({ users });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const createUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { email, fullname, role, password } = req.body;
    if (!email || !fullname || !role) return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = password ? await bcrypt.hash(password, 12) : undefined;
    const user = await User.create({
      email,
      fullname,
      role,
      password: hashed || "temporary123", // if you want to force password reset flow
      isVerified: true,
    });

    res.status(201).json({ message: "User created", user });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Create user failed", error: err.message });
  }
};

export const deleteUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // remove monitors
    await Monitor.deleteMany({ user: user._id });

    // remove any sessions in redis matching session:${userId}:*
    const keys = await redis.keys(`session:${user._id}:*`);
    if (keys.length) {
      await redis.del(...keys);
    }

    await user.remove();
    res.status(200).json({ message: "User and related monitors removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Delete user failed", error: err.message });
  }
};
