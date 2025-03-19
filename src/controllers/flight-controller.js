const {FlightService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

async function createFlight(req,res){
    try{
          const flight=await FlightService.createFlight({
            flightNumber:req.body.flightNumber,
            code:req.body.code,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeats:req.body.totalSeats
          });
          SuccessResponse.message ='flight created successfully';
          SuccessResponse.data=flight;
          return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err){
           res.send("internal error: " + err.message);
    }
}
async function getAllFlights(req,res){
  try{
    const flights=await FlightService.getAllFlights(req.query);
    SuccessResponse.data=flights;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);

}
catch(err){
  ErrorResponse.error=err;
  return res.status(400).json(ErrorResponse);
}
}


async function getFlight(req,res){
  try{
      const Flight=await FlightService.getFlight(req.params.id);
      SuccessResponse.data=Flight;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}

async function updateSeats(req,res){
   try{
     const response = await FlightService.updateSeats({
      flightId:req.params.id,
      seats:req.body.seats,
      dec:req.body.dec
     })
     SuccessResponse.data=response;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);
 
   }
   catch(err){
    res.send("internal error: " + err.message);
  }
}
module.exports = {
    createFlight:createFlight,
    getAllFlights:getAllFlights,
    getFlight:getFlight,
    updateSeats:updateSeats
    
}