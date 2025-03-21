const {BookingService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');


async function createBooking(req,res){
    try{
          const response=await BookingService.createBooking({
            flightId:req.body.flightId,
            userId:req.body.userId,
            noOfseats:req.body.noOfseats
          });
          SuccessResponse.data=response;
          return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(err){
           res.send("internal error: " + err.message);
    }
}
module.exports={
    createBooking:createBooking
}