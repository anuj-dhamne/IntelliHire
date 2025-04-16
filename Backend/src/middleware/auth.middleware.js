import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT=asyncHandler(async (req,res,next)=>{

try {
    const token= req.header("Authorization")?.replace("Bearer ","");
    // console.log("Token Received : ",token)
    
    if(!token){
        return res.status(401).json({messgae:"Unauthorised request !"})
    }
    
    const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    console.log("Decoded token:", decodedToken);

    const user =await User.findById(decodedToken._id).select("-password -refreshToken")
    if(!user){
        return res.status(401).json({messgae:"invalid access token ! "});
    }
    req.user=user;
    next();
} catch (error) {
    console.error("JWT Error:", error.message);
    throw error;
}
})




export {verifyJWT}