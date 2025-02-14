const {CityService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

// POST:/CITIES
async function createCity(req,res){
    try{
          const city=await CityService.createCity({
            name:req.body.name,
          });
          SuccessResponse.message ='city created successfully';
          SuccessResponse.data=city;
          return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(err){
           res.send("internal error: " + err.message);
    }
}

async function destroyCity(req,res){
  try{
    const response=await CityService.deletCity(req.params.id);
    SuccessResponse.data=response;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);

}
catch(err){
  res.send("internal error: " + err.message);
}
}
async function updateCity(req, res) {
  try {
      const response = await CityService.updateCity(req.params.id, req.body);
      SuccessResponse.data=response;
    return res.status(StatusCodes.OK)
    .json(SuccessResponse);
  } catch (err) {
      return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal Server Error"
      });
  }
}
async function getCities(req,res){
  try{
      const cities=await CityService.getCities();
      SuccessResponse.data=cities;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}
async function getCity(req,res){
  try{
      const airplane=await CityService.getCity(req.params.id);
      SuccessResponse.data=airplane;
      return res.status(StatusCodes.OK)
      .json(SuccessResponse);

  }
  catch(err){
    res.send("internal error: " + err.message);
  }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity,
    getCity,
    getCities
}