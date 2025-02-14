const {AirplaneService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

async function createAirplane(req,res){
    try{
          const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
          });
          SuccessResponse.message ='Airplane created successfully';
          SuccessResponse.data=airplane;
          return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err){
           res.send("internal error: " + err.message);
    }
}
async function getAirplanes(req,res){
  try{
      const airplanes=await AirplaneService.getAirplanes();
      SuccessResponse.data=airplanes;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}
async function getAirplane(req,res){
  try{
      const airplane=await AirplaneService.getAirplane(req.params.id);
      SuccessResponse.data=airplane;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}
async function destroyAirplane(req,res){
  try{
    const response=await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);

}
catch(err){
  res.send("internal error: " + err.message);
}
}
async function updateAirplane(req,res){
  try{
    const response=await AirplaneService.updateAirplane(req.params.id,req.body);
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);

}
catch(err){
  res.send("internal error: " + err.message);
}

}

module.exports = {
    createAirplane:createAirplane,
    getAirplanes:getAirplanes,
    getAirplane:getAirplane,
    destroyAirplane:destroyAirplane,
    updateAirplane:updateAirplane
}