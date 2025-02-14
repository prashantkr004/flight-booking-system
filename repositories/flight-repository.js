const CrudRepository= require('./crud-repository');
const {Sequelize}=require('sequelize');
const {Flight,Airplane,Airport,City}= require('../models');
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }
    async getAllFlights(filter,sort){
        const response=await Flight.findAll({
            where:filter,
            order:sort,
            include:[{
                model:Airplane,
                required:true,
                as:'airplane_detail',
            },{
               model:Airport,
               required:true,
               as:'Departue_airport',
               on:{
                  col1:Sequelize.where(Sequelize.col('Flight.departureAirportId'),'=',Sequelize.col('Departue_airport.code'))
               },
               include:[{
                    model:City,
                    required:true,
               }]
            },{
                model:Airport,
                required:true,
                as:'Arrival_airport',
                on:{
                   col1:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),'=',Sequelize.col('Arrival_airport.code'))
                } ,
                include:[{
                    model:City,
                    required:true,
               }]
             }]
        });
        return response;
    }
}
module.exports=FlightRepository;