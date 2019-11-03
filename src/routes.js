'use strict';
const express = require("express");
const routes = express.Router();
const UserController = require('./controllers/UserController');
const ProfController = require('./controllers/ProfsController');
const LoginController = require('./controllers/LoginController');
const authNormalUser = require('./middleware/normalAuth');
const adminAuth = require('./middleware/adminAuth');
routes.post('/login', LoginController.index);
routes.use(authNormalUser);
routes.post('/qrcode', (req, res) => {
    res.status(200).send();
});
routes.use(adminAuth);
routes.post('/users', UserController.store);
routes.post('/profs', ProfController.store);

module.exports = routes;