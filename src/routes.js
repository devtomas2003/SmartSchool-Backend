'use strict';
const express = require("express");
const routes = express.Router();
const UserController = require('./controllers/UserController');
const ProfController = require('./controllers/ProfsController');
const LoginController = require('./controllers/LoginController');
routes.post('/users', UserController.store);
routes.post('/profs', ProfController.store);
routes.post('/login', LoginController.index);

module.exports = routes;