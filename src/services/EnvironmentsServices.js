const { Model } = require('sequelize');
const Services = require('./Services')

class EnvironmentsServices extends Services {
    constructor() {
        super('Environments');
    }
}

module.exports = EnvironmentsServices;