const {FlightRepository}=require('../repositories');
const {Op}=require('sequelize');
const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');
const {dateTimeHelper}=require('../utils');

const flightRepository = new FlightRepository();
async function createFlight(data){
    try{
        const flight=await flightRepository.create(data);
        return flight;
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
      throw new AppError('Cannot Create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
}
}
async function getAllFlights(query){
    let customfilter={};
    let sortFilter=[];
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-");
        customfilter.departureAirportId=departureAirportId;
        customfilter.arrivalAirportId=arrivalAirportId;
    }
    if(query.price){
        [minprice,maxprice]=query.price.split("-");
        customfilter.price={
            [Op.between]:[(minprice==undefined?0:minprice),(maxprice==undefined?20000:maxprice)]
        }
    }

    if(query.travellers){
        customfilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customfilter.departureTime={
            [Op.eq]:query.tripDate
        }
    }
    if(query.sort){
        const params=query.sort.split(",");
        const sortFilters=params.map((params)=>params.split("_"));
        sortFilter=sortFilters;
    }
    console.log(customfilter);
    try{
        const flights= await flightRepository.getAllFlights(customfilter,sortFilter);
        return flights;
    }
    catch(error){
        throw new AppError('Cannot fetch the data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


  
async function getFlight(id){
    try{
        const Flight=await flightRepository.get(id);
        return Flight;
    }
    catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("Flight not found",error.StatusCodes);
        }
        throw new AppError('Cannot fetch the details of  the flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}