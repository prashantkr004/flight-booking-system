const express = require('express');
const {flightController}=require('../../controllers');
const {flightMiddlewares} = require('../../middlewares');
const router= express.Router();


router.post('/',flightMiddlewares.validateCreateRequest,flightController.createFlight);
router.get('/',flightController.getAllFlights);
router.get('/:id',flightController.getFlight);
router.patch('/:id/seats',flightMiddlewares.validateUpdateSeatsRequests,flightController.updateSeats);
module.exports=router;