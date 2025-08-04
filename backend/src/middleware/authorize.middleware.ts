import { Request,Response,NextFunction } from "express"

export const  aurthorize = (roles:string[]) =>{
    return(req: Request,res:Response,next:NextFunction) =>{
        const user = req.user;
        if(!user || !roles.includes(user.role)){
            return res.status(403).json({message:'Forbiddeen Access denied'})
        }
        next();
    };
};