import mongoose from "mongoose";
import { Request,Response } from "express";
import crypto from "crypto";

import { razorpay } from "../../config/razopay";
import { Payment } from "../../models/Payment.model";
import campaignModel from "../../models/campaign.model";

export const createorder = async(req: Request, res: Response) =>{
    try {
        if(!req.user ) return res.status(401).json({message: "Unauthorize"})
        const {campaignId,userId, amount, currency } = req.body;

        const options = {
            amount : amount * 100,
            currency: currency  || "INR",
            receipt: `receipt_${Date.now()}`,
            notes:{
                campaignId
            },
        };

        const order = await razorpay.orders.create(options);

        const payment = new Payment ({
            userId: req.user.userId,
            campaignId,
            amount,
            orderId: order.id,
            receipt: order.receipt,
            paymentStatus:"PENDING",
        });

        await payment.save();

        return res.json({success: true, order});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Ineternal server error "});
    }
};

export const verifyPayment = async (req: Request, res: Response) =>{
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        // to generate signature 
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedsign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "HWtNh8v9cgxLi17OtFdam6Rc" )
        .update(sign.toString())
        .digest("hex");
        if(razorpay_signature !== expectedsign){
            await Payment.findOneAndUpdate(
                {orderId: razorpay_order_id},
                {paymentStatus: "FAILED"}
            );
            return res.status(200).json({success: false, message: "Payment verified failed "});
        };
        const payment = await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {paymentStatus: "SUCCESS",paymentId: razorpay_payment_id,},{ new: true });
        if(payment){
            await campaignModel.findByIdAndUpdate(payment.campaignId,{
                $inc:{raised:payment.amount, donors:1},
            });
        };
        return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    };
};

