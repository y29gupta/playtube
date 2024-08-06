 import asyncHandler from '../utils/asyncHandler.js'
const registerUser= asyncHandler(async (req,res)=>{
   //get details from the frontend
   //check the fields are  not empty
   //chec user user if already exists
   //check for images, check for avatar
   //upload them to clodinay
   //create user object entry in db
   //remove password and refresh token field  from response
   //check for user creation 
   //return res

   const {username,fullname,email,avatar,password,coverImage}=req.body
   console.log(("email",email));
   
})

export {registerUser}