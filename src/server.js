'use strict';
const app = require('./app');
require('dotenv').config();
require('./database');
app.listen(process.env.PORT || 8080);