import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'




// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET// Click 'View Credentials' below to copy your API secret
});


const uploadCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resourceType: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("error", error.message)
    }
}
export { uploadCloudinary }


