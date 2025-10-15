import {Request, Response} from "express"

export const logout = (req:Request, res: Response) =>{
    res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        });

    res.status(200).json({message: " Logged our succcessfully"});
}