import mongoose from "mongoose";
import { Request,Response } from "express";
import userModel from "../../models/user.model";
import { razorpay } from "../../config/razopay";

export const createorder = async(req: Request, res: Response) =>{
    try {
        const {campaignId, amount, currency } = req.body;

        const options = {
            amount : amount * 100,
            currency: currency  || "INR",
            receipt: `receipt_${Date.now}`,
            notes:{
                campaignId
            },
        };

        const order = await razorpay.orders.create(options);

        return res.json({success: true, order});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Ineternal server error "});
    }
}

