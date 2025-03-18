const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"flight number not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }

    if(!req.body.airplaneId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"airplaneId not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"departureAirportId not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"arrivalAirportId not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"arrivalTime not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.departureTime){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"departureTime not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.price){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"price not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    if(!req.body.totalSeats){
        ErrorResponse.message="something went wrong while creating flight";
        ErrorResponse.error={message:"totalSeats not found"};
        return res.status(StatusCodes.BAD_REQUEST).json({
           ErrorResponse
        })
    }
    next();
}
module.exports={
    validateCreateRequest: validateCreateRequest
}