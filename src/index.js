const {serverConfig,Logger}=require('./config/index.js');
const express= require('express');
const apiRoutes=require('./routes');

const scheduleCrons = require('./utils/common/cron-jobs.js'); 
const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',apiRoutes);

app.listen(serverConfig.PORT,()=>{
    console.log(`Server running on port ${serverConfig.PORT}`);
    Logger.info('Successfully started the server',"root",{msg:"something"});
    scheduleCrons();
}); 