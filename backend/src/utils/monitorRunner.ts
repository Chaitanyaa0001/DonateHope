import monitorModel from "../models/monitor.model";

export const startMonitorRunner =  async () =>{
    console.log("Monitor started");

    setInterval(async () => {
        console.log("Running monitors");
        const monitors = await monitorModel.find();
        

    })
    
}