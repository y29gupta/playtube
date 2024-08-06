import mongoose from 'mongoose'
import { db_name } from '../constants.js'

const connectDB=async ()=>{
    try{
   const response=     await mongoose.connect(`${process.env.MONGO_URL}/${db_name}`)
        console.log("database connected")
        
return response.connection.host
    }catch(err){
        console.log(err,"error")
    }
}

export default connectDB