import mongoose, { Schema } from "mongoose";
import { ICampaign } from "../types/campaign.type";

const campaginSchema =  new Schema<ICampaign>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    goal:{
        type:Number,
        required:true
    },
    raised:{
        type:Number   ,
        required:true 
    },
    location:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    donors:{
        type:Number,
        default : 0,
        required:true
    },
    daysLeft:{
        type:Number
    }
},{timestamps:true});

campaginSchema.index({category: 1});
campaginSchema.index({location: 1});
campaginSchema.index({user: 1});

export default mongoose.model<ICampaign>("Campaign", campaginSchema);