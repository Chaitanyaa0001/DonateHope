import mongoose, { Schema, trusted } from "mongoose";
import { IUser } from "../types/user.types";

const userschema = new Schema<IUser>({
    email:{
        type:String,
        required:false,
        unique:true,
        index:true
    },
    phone:{
        type:String,
        required:false,
        unique:true,
        index:true
    },
    fullname:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:false
    },
    otpExpiresAt:{
        type:Date,
        index:{expires:'5m'}
    },
    role:{
        type:String,
        enum: ['donor', 'funder'],
        required:true,
        index:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userschema.pre('validate', function (next) {
  if (!this.email && !this.phone) {
    next(new Error('Either email or phone is required'));
  } else {
    next();
  }
});


export default mongoose.model<IUser>('User',userschema);