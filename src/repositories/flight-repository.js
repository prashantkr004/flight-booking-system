const CrudRepository= require('./crud-repository');
const {Sequelize}=require('sequelize');
const {Flight,Airplane,Airport,City}= require('../models');
const db=require('../models');
const {addRowLockOnFlights}  =require('./queries');
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }
    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true, transaction) {
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId), { transaction });
    
            const flight = await Flight.findByPk(flightId, { transaction });
    
            if (!flight) {
                throw new Error("Flight not found");
            }
            if (+dec) {
                await flight.decrement('totalSeats', { by: seats, transaction });
            } else {
                await flight.increment('totalSeats', { by: seats, transaction });
             }
            return flight;
        } catch (error) {
            throw error;
        }
    }
    
}
module.exports=FlightRepository;