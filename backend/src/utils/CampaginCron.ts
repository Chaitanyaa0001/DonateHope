import cron from "node-cron";
import campaignModel from "../models/campaign.model";


cron.schedule("0 0 * * * ", async () =>{
    try {
        console.log("Running daily campagins update");
        await campaignModel.updateMany(
            {daysLeft: {$gt : 0}},
            {$inc : {daysLeft: -1}}
        );
        await campaignModel.deleteMany({daysLeft: {$lte: 0 }});
        console.log("campagin updates succesfully "); 
    } catch (err) {
        console.error("Error while updating campagins daily ", err);
        
    }
} )