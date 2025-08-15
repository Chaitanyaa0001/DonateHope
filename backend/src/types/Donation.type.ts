import mongoose from "mongoose";


export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId; // Donor's ID
  campaignId: mongoose.Types.ObjectId; // Campaign they donated to
  amount: number; // Donation amount
  currency: string; // "INR", "USD", etc.
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  paymentId?: string; // Razorpay payment ID
  orderId?: string; // Razorpay order ID
  receipt?: string;
  createdAt: Date;
}