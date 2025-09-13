import {Request, Response} from "express"

export const logout = (req:Request, res: Response) =>{
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({message: " Logged our succcessfully"});
}