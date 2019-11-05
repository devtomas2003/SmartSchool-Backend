'use strict';
const express = require("express");
const routes = express.Router();
const UserController = require('./controllers/UserController');
const ProfController = require('./controllers/ProfsController');
const LoginController = require('./controllers/LoginController');
const PasswordRecover = require('./controllers/RecoverController')
const authNormalUser = require('./middleware/normalAuth');
const adminAuth = require('./middleware/adminAuth');
routes.post('/login', LoginController.index);
routes.post('/recover', PasswordRecover.index);
routes.use(authNormalUser);
routes.post('/qrcode', (req, res) => {
    res.status(200).send();
});
routes.use(adminAuth);
routes.post('/users', UserController.store);
routes.post('/profs', ProfController.store);

module.exports = routes;