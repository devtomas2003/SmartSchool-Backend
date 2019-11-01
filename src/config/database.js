'use strict';
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
module.exports = {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_IP,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    storage: './__tests__/database.sqlite',
    define: {
        timestamps: false
    },
    logging: false
};