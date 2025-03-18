const {AirplaneRepository}=require('../repositories');

const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();
async function createAirplane(data){
    try{
        const airplane=await airplaneRepository.create(data);
        return airplane;
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
      throw new AppError('Cannot Create a new Airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
}
}

async function getAirplanes(){
    try{
        const airplanes=await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error){
        throw new AppError('Cannot fetch the data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplane(id){
    try{
        const airplane=await airplaneRepository.get(id);
        return airplane;
    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane not found",error.StatusCodes);
        }
        throw new AppError('Cannot fetch the data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyAirplane(id){
    try{
          const response=await airplaneRepository.destroy(id);
          return response;

    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane not found",error.StatusCodes);
        }
            throw new AppError('Cannot destroy the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function  updateAirplane(id,data){
    try{
          const response=await airplaneRepository.update(id,data);
          return response;
          

    }
    catch(error){
        if(error.StatusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane not found",error.StatusCodes);
        }
            throw new AppError('Cannot update the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
module.exports = {
    createAirplane,
    getAirplane,
    getAirplanes,
    destroyAirplane,
    updateAirplane

}