const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message="something went wrong while creating airport";
        ErrorResponse.error={message:"Name not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }

    if(!req.body.code){
        ErrorResponse.message="something went wrong while creating airport";
        ErrorResponse.error={message:"code not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.cityId){
        ErrorResponse.message="something went wrong while creating airport";
        ErrorResponse.error={message:"city Id not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    next();
}

module.exports={
    validateCreateRequest: validateCreateRequest
}