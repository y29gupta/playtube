// import mongoose from "mongoose"
// import { DB_NAME } from "./constants"
// import {db_name} from './constants.js'

import express from 'express'

import dotenv from 'dotenv'
import connectDB from "./db/index.js"
import { app } from './app.js'
// require("dotenv").config()
dotenv.config({
    path:"./.env"
})

// const port = process.env.PORT || 4000

// const app = express()




connectDB()
.then(() => {
    app.listen( 3000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


// (async () => {
//     try {

//         await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`)
//         console.log("mongo db connected")
//         app.on("error",(err)=>{
//             console.log("err",err)
//         })

//         app.listen(port, () => {
//             console.log("server started at port 000")
//         })

//     } catch (error) {
//         console.log(error, "err")
//         process.exit(1)
//     }
// }

// )()

// connect()


