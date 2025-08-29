import mongoose, { Schema } from "mongoose";
import { IPayment } from "../types/Donation.type";

const  paymentschema = new Schema<IPayment>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    campaignId:{
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String
    },
    receipt:{
        type: String
    }
},{timestamps:true});

export const Payment = mongoose.model<IPayment>("Payment", paymentschema);