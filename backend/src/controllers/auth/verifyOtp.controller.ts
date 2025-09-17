import User from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import {Request,Response} from 'express'

export const verifyOTP = async (req:Request,res:Response) =>{
    try {
        const {identifier,otp} = req.body;

        if(!identifier || !otp){
            return res.status(400).json({message:"OTP and identifier  is required"})
        }
        // const user = await User.findOne({$or: [{ email: identifier }, { phone: identifier }],otp});
        const user = await User.findOne({ email: identifier, otp });
        if(!user){  
            return res.status(400).json({message:"inavlaid otp or identifier"});
        }
        if(!user.otpExpiresAt || user.otpExpiresAt < new Date()){
            return res.status(400).json({message:"Otp has expired"});
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        const accessToken = generateAccessToken(user._id.toString(),user.role);
        const refreshToken = generateRefreshToken(user._id.toString(),user.role);

        res.cookie('access_token', accessToken,{
            httpOnly : true,
            secure: true,
            sameSite:'strict',
            maxAge:15 * 60 * 1000,
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            
        });
        res.status(200).json({message:"Otp verified",role:user.role})
    } catch (err) {
        console.error('otp verififcation error',err);
        res.status(500).json({message:"Inetrnal server error"})   
    }
}