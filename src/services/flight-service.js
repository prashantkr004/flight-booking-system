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
async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    if(query.trips) {
       [departureAirportId, arrivalAirportId] = query.trips.split("-"); 
       customFilter.departureAirportId = departureAirportId;
       customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
        }
    }
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
    console.log(customFilter, sortFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
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

async function updateSeats(data){
    try{
        const response=await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    }
  catch(err){
        console.log(err);
       throw new AppError("cannot update data of the flight",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}