
const {StatusCodes}=require('http-status-codes'); 
const info=(req,res)=>{
   return res.json({
      success:true,
      message:"Success",
      error:{}

   })
};
module.exports =info;

