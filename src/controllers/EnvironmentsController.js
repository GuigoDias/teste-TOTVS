const Controller = require('./Controller');
const EnvironmentsServices = require('../services/EnvironmentsServices.js');

const environmentsServices = new EnvironmentsServices();

class EnvironmentsController extends Controller{
    constructor(){
        super(environmentsServices);
    }
}

module.exports = EnvironmentsController;