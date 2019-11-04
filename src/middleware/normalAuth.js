const { auth_users } = require('../models');
const moment = require('moment');
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            "error": "Utilizador não autenticado!",
            "level": "3"
        });
    }
        const [, token] = authHeader.split(" ");
        const verifyToken = await auth_users.findOne({ where: { hash: token }});
        if(!verifyToken){
            return res.status(401).json({
                "error": "Utilizador não autenticado!",
                "level": "3"
            });
        }
        if(verifyToken.device == "web"){
            const expireTo = moment(verifyToken.expirationTime);
            const now = moment(new Date());
            if(expireTo.diff(now) > 0){
                return res.status(401).json({
                    "error": "Sessão expirada! Inicie novamente sessão!",
                    "level": "2"
                });
            }
        }
       return next();
};