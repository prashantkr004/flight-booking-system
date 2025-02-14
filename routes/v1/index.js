const express= require('express');
const router= express.Router();
const InfoController=require('../../controllers');

const airplaneRoutes=require('./airplane-routes');
const citiesRoutes=require('./city-routes');
const airportRoutes=require('./airport-routes');
const flightRoutes=require('./flight-routes');

router.get('/info',InfoController.InfoControllers);
router.use('/airplanes',airplaneRoutes);
router.use('/cities',citiesRoutes);
router.use('/airports',airportRoutes);
router.use('/flights',flightRoutes);


module.exports = router;