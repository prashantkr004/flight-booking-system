const express = require('express');
const {cityController}=require('../../controllers');
const {cityMiddlewares}=require('../../middlewares');
const router= express.Router();


router.post('/',cityMiddlewares.cityvalidator,cityController.createCity);
router.delete('/:id',cityController.destroyCity);
router.patch('/:id',cityController.updateCity);
router.get('/:id',cityController.getCity);
router.get('/',cityController.getCities);
module.exports=router;