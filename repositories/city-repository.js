const CrudRepository= require('./crud-repository');

const {City}= require('../models');
class cityRepository extends CrudRepository{
    constructor(){
        super(City);
    }


}

module.exports=cityRepository;