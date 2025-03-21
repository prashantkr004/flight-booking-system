const {AirportService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

async function createAirport(req,res){
    try{
          const airplane=await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
          });
          SuccessResponse.message ='Airport created successfully';
          SuccessResponse.data=airplane;
          return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err){
           res.send("internal error: " + err.message);
    }
}
async function getAirports(req,res){
  try{
      const airports=await AirportService.getAirports();
      SuccessResponse.data=airports;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}
async function getAirport(req,res){
  try{
      const airport=await AirportService.getAirport(req.params.id);
      SuccessResponse.data=airport;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}
async function destroyAirport(req,res){
  try{
    const response=await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);

}
catch(err){
  res.send("internal error: " + err.message);
}
}
async function updateAirport(req,res){
  try{
    const response=await AirportService.updateAirport(req.params.id,req.body);
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);

}
catch(err){
  res.send("internal error: " + err.message);
}

}

module.exports = {
    createAirport:createAirport,
    getAirport:getAirport,
    getAirports:getAirports,
    destroyAirport:destroyAirport,
    updateAirport:updateAirport
}