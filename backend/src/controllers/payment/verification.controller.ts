import { Request,Response } from "express";
import crypto from "crypto";
export const verifyPayment = async (req: Request, res: Response) =>{
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedsign = crypto.createHmac("sha256", process.env.RAZOPAY_KEY_SECRET || "HWtNh8v9cgxLi17OtFdam6Rc" )
        .update(sign.toString())
        .digest("hex");

        if(razorpay_signature === expectedsign){
            return res.status(200).json({success: true, message: "Payment verified successfully "})
        }else{
            return res.status(400).json({success: false, message: "payment failed try again "})
        };

    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    };
};