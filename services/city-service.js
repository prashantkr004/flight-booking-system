const {CityRepository}=require('../repositories');

const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');

const cityRepository=new CityRepository();

async function createCity(data){
    try{
        const city=await cityRepository.create(data);
        return city;
    }
    catch(error){
        if(error.name=='SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((error)=>{
                explanation.push(error.message);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        if(error.name=='SequalizeValidatorError'){
            let explanation = [];
            error.errors.forEach((error)=>{
                explanation.push(error.message);
            })
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
    }
      throw new AppError('Cannot Create a new City object',StatusCodes.INTERNAL_SERVER_ERROR);
}
}


async function deletCity(id){
          try{
            const response=await cityRepository.destroy(id);
            return response;
          }
          catch(error){
            if(error.StatusCodes == StatusCodes.NOT_FOUND){
                throw new AppError("citie can not be found",error.StatusCodes);
            }
               throw new AppError('Cannot destroy the city',StatusCodes.INTERNAL_SERVER_ERROR);
            
        }
}

async function  updateCity(id,data){
    try{
          const response=await cityRepository.update(id,data);
          return response;
          

    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("City not found",error.StatusCodes);
        }
            throw new AppError('Cannot update the City',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getCities(){
    try{
        const cities=await cityRepository.getAll();
        return cities;
    }
    catch(error){
        throw new AppError('Cannot fetch the data of all the Cities',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getCity(id){
    try{
        const city=await cityRepository.get(id);
        return city;
    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("City not found",error.StatusCodes);
        }
        throw new AppError('Cannot fetch the data of the city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    deletCity,
    updateCity,
    getCity,
    getCities
}