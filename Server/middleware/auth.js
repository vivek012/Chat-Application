import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectRoute = async (req, res , next)=>{
    try{
        const token = req.headers.token;
        const decoded =  jwt.verify(token , process.env.JWT_SECRET)
        const user  = await User.findById(decoded.id).select("-password")
        if(!user){
            res.status(401).json({
                success : false,
                message: "user not Found"
            })
        }
        req.user = user
        next();
    }catch(error){
        res.status(401).json({
            status: false,
            message: error.message            
        })
    }
}