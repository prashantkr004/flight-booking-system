const {BookingRepository,FlightRepository}=require("../repositories");
const db=require("../models");
const axios=require("axios");
const {StatusCodes}=require("http-status-codes");
const AppError=require('../utils/errors/app-error');
const bookingRepository=new BookingRepository();
const update=new FlightRepository();
async function createBooking(data){
     const transaction=await db.sequelize.transaction();
    try{
        const flight=await db.Flight.findOne({
            where: { id: data.flightId }
         });
        const flightdata=flight;
        console.log(flight);
        if (!flight || flightdata.totalSeats < data.noOfSeats) {
           throw new AppError('Required no of seats not available', StatusCodes.BAD_REQUEST);
       }
       const totalbookingamount=data.noOfSeats * flightdata.price;
       const bookingPayload = {...data,totalcost:totalbookingamount};

       const booking = await bookingRepository.create(bookingPayload,transaction);
       const response=await update.updateRemainingSeats(data.flightId,data.noOfSeats);

       await transaction.commit();
       return booking;
    }
    catch(error){
             await transaction.rollback();
             throw error;
    }
   
}

module.exports={
    createBooking:createBooking
}