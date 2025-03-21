const {BookingRepository,FlightRepository}=require("../repositories");
const db=require("../models");
const axios=require("axios");
const {StatusCodes}=require("http-status-codes");
const AppError=require('../utils/errors/app-error');
const bookingRepository=new BookingRepository();
const update=new FlightRepository();
async function createBooking(data) { 
    const transaction = await db.sequelize.transaction();   
    try {
        const flight = await db.Flight.findOne({
            where: { id: data.flightId },
            transaction 
        });

        if (!flight || flight.totalSeats < data.noOfseats) {
            throw new AppError('Required no of seats not available', StatusCodes.BAD_REQUEST);
        }
        const totalBookingAmount = data.noOfseats * flight.price;
        const bookingPayload = {
            ...data,
            totalcost: totalBookingAmount,
            noOfseats: data.noOfseats,
        };
        
        const booking = await bookingRepository.create(bookingPayload, { transaction });

        await update.updateRemainingSeats(data.flightId, Number(data.noOfseats), true, transaction);

        await transaction.commit();
        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function makePayment(data){
    const transaction = await db.sequelize.transaction();
    try{
        const bookingDetails=await bookingRepository.get(data.bookingId,transaction);
        if(bookingDetails.status=='cancelled'){
            throw new AppError('The booking cancelled', StatusCodes.BAD_REQUEST);
        }
        const bookingtime=new Date(bookingDetails.createdAt);
        const currenttime=new Date();
        if(currenttime-bookingtime>300000){
            await bookingRepository.update(data.bookingId,{status:'cancelled'},transaction);
            throw new AppError('The time of payment is passed', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.totalcost!=data.totalcost){
            throw new AppError('The amount of payment does not match the booking amount', StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId!=data.userId){
            throw new AppError('The user does not match ', StatusCodes.BAD_REQUEST);
        }
        const response=await bookingRepository.update(data.bookingId,{status:'booked'},transaction);
        await transaction.commit();
    }
    catch(error){
        await transaction.rollback();
        throw error;
    }
}

module.exports={
    createBooking:createBooking,
    makePayment:makePayment
}