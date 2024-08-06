const asyncHandler=(reqhandle)=>{
   return (req,res,next)=>{
        return Promise.resolve(reqhandle(req,res,next)).catch(err=>next(err))
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

export default asyncHandler