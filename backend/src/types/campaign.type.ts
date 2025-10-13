import { Document } from "mongoose"
import mongoose from "mongoose";

export interface ICampaign extends Document {
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  location: string;
  category: string;
  donors: number;
  daysLeft: number;
  urgent: boolean;
  user: mongoose.Schema.Types.ObjectId; 
};