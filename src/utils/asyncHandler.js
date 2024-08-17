const asyncHandler=(reqhandle)=>{
   return (req,res,next)=>{
        return Promise.resolve(reqhandle(req,res,next))
        .catch((err)=>{

            console.log("async Handler error",err.message)
            res.status(400).json({message:err.message})
        })
    }
}


// const asyncHanler= (fn)=> async(req,res,next)=>{
//     try{

//         await fn(req,res,next)
//     }catch(err){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }

export  {asyncHandler}