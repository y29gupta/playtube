import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'




    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET// Click 'View Credentials' below to copy your API secret
    });
    

    const uploadCloudinary=async (locaFilePath)=>{
        try{

            if(!locaFilePath) return null
            const response= await   cloudinary.uploader.upload(locaFilePath,{
                resourceType:"auto"
            })
            console.log("response",response)
            return response
        }catch(error){
            fs.unlinkSync(locaFilePath)
            console.log("error",error.message)
        }
    }
   
    
  