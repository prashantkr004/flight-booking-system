const {AirportRepository}=require('../repositories');

const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');

const airportRepository = new AirportRepository();
async function createAirport(data){
    try{
        const airport=await airportRepository.create(data);
        return airport;
    }
    catch(error){
        if(error.name=='SequalizeValidatorError'){
            let explanation = [];
            console.log(error);
            error.errors.forEach((error)=>{
                explanation.push(error.message);
            })
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }
      throw new AppError('Cannot Create a new Airport object',StatusCodes.INTERNAL_SERVER_ERROR);
}
}

async function getAirports(){
    try{
        const airports=await airportRepository.getAll();
        return airports;
    }
    catch(error){
        throw new AppError('Cannot fetch the data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirport(id){
    try{
        const airport=await airportRepository.get(id);
        return airport;
    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Airport not found",error.StatusCodes);
        }
        throw new AppError('Cannot fetch the data of all the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyAirport(id){
    try{
          const response=await airportRepository.destroy(id);
          return response;

    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Airplan not found",error.StatusCodes);
        }
            throw new AppError('Cannot destroy the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function  updateAirport(id,data){
    try{
          const response=await airportRepository.update(id,data);
          return response;
          

    }
    catch(error){
        if(error.StatusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport not found",error.StatusCodes);
        }
            throw new AppError('Cannot update the airport',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}