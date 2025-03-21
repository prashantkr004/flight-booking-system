const cron=require('node-cron');

const BookingService=require('../../services/booking-service');
 function scheduleCrons(){
    cron.schedule('*/10 * * * *', async() => {
        const response=await BookingService.cancelOldBookings();
        console.log('running a task every  10 minutes ');
        return response;
      });
}

module.exports = scheduleCrons;