const express = require('express');
const {BookingController}=require('../../controllers');
const {} = require('../../middlewares');
const router= express.Router();



router.post('/',BookingController.createBooking);




module.exports=router;
