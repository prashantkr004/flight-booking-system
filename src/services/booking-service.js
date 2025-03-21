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



module.exports={
    createBooking:createBooking
}