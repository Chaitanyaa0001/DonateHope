import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model";


export const postMonitor = (req: Request, res: Response) =>{
    try {
        const user = req.user;
        const {name, endpoint,method,interval,headers,body, files} = req.body;
        if(!name || !endpoint || ! method || !interval){
            return res.status(400).json({message: "Name , endpoint, method and intevral is required"})
        }
        
        const monitor = monitorModel.create({
            user: user._id,
            name,
            endpoint,
            method,
            headers: headers || {},
            body: body || {},
            files:files || [],
            interval: interval || 5,
        });
        return res.status(201).json({message:"Monitor created succesfully",monitor})
    } catch (err) {
        console.log("error in creatingg monitor in sever side", err);
        return res.status(500).json({message:"Internal serve error"})
    }
}

export const getAllMonitors = async(req: Request, res: Response) =>{
    try {
        const monitors = await monitorModel.find().populate("user", "email fullname role").sort({ createdAt: -1 });
        return res.status(200).json(monitors);
    } catch (err) {
        console.log("error in fetching all monitors in server side", err);
        return res.status(500).json({message: "Internal server error "})
    }
}


export  const getUserMonitors = async (req:Request, res:Response) =>{
    try{
        const user = req.user;
        if(!user){
            return res.status(401).json({message: "Unauthorized access"})
        };
        const monitors = await monitorModel.find({user: user._id}).populate("user", "email fullname role").sort({ createdAt: -1 });
        return res.status(200).json(monitors);
    } catch (err) {
        console.log("error in fetching user monitors in server side", err);
        return res.status(500).json({message: "Internal server error "})
    }
}

export const getUserMonitorById = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const monitor = await monitorModel.findById(id);
        if(!monitor){
            return res.status(404).json({message: "Monitor not found"});
        };
        return res.status(200).json(monitor);
    } catch (err) {
        console.log("error in fecthing monitor by id in sever side ", err);
        return res.status
        
    }
}

export const deleteMonitorById = async (req: Request, res: Response) =>{
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Access denied"})
        };
        const {id} = req.params;
        const monitor = await monitorModel.findById(id);
        if(!monitor){
            return res.status(404).json({message: "Monitor not found"});
        }
        await monitorModel.findByIdAndDelete(id);
        return res.status(200).json({message: "Monitor deleted successfully"});
    } catch (err) {
        console.log("error in deleting monitor by id in server side ", err)
        return res.status(500).json({message:" Intrernal server error"})        
    }
}
