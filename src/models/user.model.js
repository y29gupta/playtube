import mongoose, { Schema } from 'mongoose'
import jwt from "jsonwebtoken"

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true

    },
    fullname: {
        type: String,
        required: true,
        // lowercase:true,
        // unique:true,
        trim: true,
        index: true

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    watchhistory: {
       
            type: Schema.Types.ObjectId,
            ref: "video",

       

    },
    avatar: {
       
            type: String,
            required: true,

       

    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    refreshToken: {

    },
    coverImage: {
      
            type: String,


        

    }

},
    {

        timestamps: true
    })

    UserSchema.pre("save",async function (next){
        if(!this.isModified("password")) return next()
            await bcrypt.hash(this.password,10)
            next()
    })
    UserSchema.methods.isPasswordCorrect=async function(password){
       return await bcrypt.compare(password,this.password)
    }

    UserSchema.methods.generateAccessToken=function(){
     return   jwt.sign({
            _id:this._id,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
    }
    UserSchema.methods.generateRefreshToken=function(){
        return   jwt.sign({
               _id:this._id,
               email:this.email
           },
           process.env.REFRESH_TOKEN,
           {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
       )
       }
export const user = mongoose.model('User', UserSchema)