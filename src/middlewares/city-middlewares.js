const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');

function cityvalidator(req,res,next){
    if(!req.body.name){
        ErrorResponse.message="something went wrong while creating city";
        ErrorResponse.error={message:"City name cannot be empty"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    next();
}
module.exports={
    cityvalidator: cityvalidator
}