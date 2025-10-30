
import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model";
import { startMonitorJob, stopMonitorJob } from "../../utils/monitorCron";
import { aiAnalyzerService } from "../../service/aiAnalyzer.service";

export const postMonitor = async (req: Request, res: Response) =>{
    try {
        const user = req.user;
        const {name, endpoint,method,interval,headers,body, files} = req.body;
        if(!name || !endpoint || ! method || !interval){
            return res.status(400).json({message: "Name , endpoint, method and intevral is required"})
        };
        const monitor = await monitorModel.create({
            user: user._id,
            name,
            endpoint,
            method,
            headers: headers || {},
            body: body || {},
            files:files || [],
            interval: interval || 5,
        });

        startMonitorJob(monitor);

        return res.status(201).json({message:"Monitor created succesfully",monitor})
    } catch (err) {
        console.log("error in creatingg monitor in sever side", err);
        return res.status(500).json({message:"Internal serve error"})
    }
}

export const analyzerMonitor = async (req:Request,res:Response ) =>{
    try {
        const {id} = req.params;
        const monitor = await monitorModel.findById(id);
        if(!monitor){
            return res.status(404).json({message: "Monitor nor found"});
        };
        const logs = monitor.logs.slice(-20);
        const analysis = await aiAnalyzerService(logs);
        return res.status(200).json({monitor: monitor.name,analysis})
    } catch (err) {
        console.log("error in analyzer monitor in server side ", err)
        throw new Error("Internal server error");
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