// const tryCatch=(handler)=>{
//    return async(req,res,next)=>{
//     try{
//         await handler(req,res,next)
//     }catch(error){
//      res.status(500).json({
//         message:error.message
//      })
//     }
//    }
// };
// export default tryCatch;
const tryCatch = (handler) => (req, res, next) =>
   Promise.resolve(handler(req, res, next)).catch(next);

export default tryCatch;
