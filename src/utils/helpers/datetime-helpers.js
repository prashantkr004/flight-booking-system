function compareTime(time1, time2){
    let time11=new Date(time1);
    let time22=new Date(time2);
   return time11.getTime()>time22.getTime();
}

module.exports = compareTime;