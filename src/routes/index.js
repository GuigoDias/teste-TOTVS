const express = require('express');
const usuarios = require('./usuariosRoute.js');
const environments = require('./environmentsRoute.js');

module.exports = app => {
    app.use(
        express.json(),
        usuarios,
        environments
    );
};