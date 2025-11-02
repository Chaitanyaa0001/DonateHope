import { Request, Response } from "express";
import userModel from "../../models/user.model";

export const checkEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "User not found", role: "none" });
    }
    return res.status(200).json({
      message: "User found",
      role: user.role,
    });
  } catch (err) {
    console.error(" Error checking email:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
