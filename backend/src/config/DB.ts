import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI !) 
        console.log("Mongo DB connected via atlas");
    } catch (err) {
        console.error("MongoDb connetction error", err);
        
    }
}