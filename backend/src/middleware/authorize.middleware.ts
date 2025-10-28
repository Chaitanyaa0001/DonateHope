import { Request,Response,NextFunction } from "express"

export const  aurthorize = (roles:string[]) =>{
    return(req: Request,res:Response,next:NextFunction) =>{
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthenticated" });
        }
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};