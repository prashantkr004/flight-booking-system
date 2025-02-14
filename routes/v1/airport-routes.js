const express = require('express');
const {airportController}=require('../../controllers');
const {airportMiddlewares} = require('../../middlewares');
const router= express.Router();


router.post('/',airportMiddlewares.validateCreateRequest,airportController.createAirport);
router.get('/',airportController.getAirports);
router.get('/:id',airportController.getAirport);
router.delete('/:id',airportController.destroyAirport);
router.patch('/:id',airportController.updateAirport);
module.exports=router;