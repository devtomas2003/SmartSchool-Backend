/*PORT=8080
DB_IP=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=smartschool
*/
const express = require('express');
class AppController{
    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.express.use(express.json());
    }
    routes(){
        this.express.use(require('./routes'));
    }
}
module.exports = new AppController().express;