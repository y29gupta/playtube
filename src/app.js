import express from "express"
import cookieParser from 'cookie-parser'
import cors from "cors"
const app=express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static("public"))

import userRouter from './routes/user.routes.js'

app.use('/api/v1/user',userRouter)

export  {app}