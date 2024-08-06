import mongoose,{Schema} from "monsgoose"
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema=new Schema({

    videoFile:{
        type:String,
        required:true
    },
    thumbnail:{
        required:true,
        type:String
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
         default:true
    },
    owner:{
        type:Schema.Type.objectId,
        ref:"User"
    }
},
{
    timestamps:true
})

videoShema.plugin(mongooseAggregatePaginateb )
export const video=mongoose.model('video',videoSchema)