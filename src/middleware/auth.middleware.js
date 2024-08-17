import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

 export const verifyJWT=asyncHandler(async(req,_,next)=>{
    try{

        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer"," ")
        if(!token){
            throw new apiError(401,"Unauthorized access token")
        }
        const decodeToken= await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)
        const user=await User.findById(decodeToken._id).select("-password -refreshToken")
        if(!user){
            throw new apiError(401,"invalid access token")
        }
        console.log(user,"auth checl")

        req.user=user
        next()
    }catch(error){
        throw new apiError(500,error?.message)

    }


})
