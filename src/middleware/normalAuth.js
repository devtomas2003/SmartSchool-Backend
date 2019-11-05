'use strict';
const { auth_users } = require('../models');
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
            const expireTo = new Date(verifyToken.expirationTime);
            const now = new Date();
            if(now >= expireTo){
                return res.status(401).json({
                    "error": "Sessão expirada! Inicie novamente sessão!",
                    "level": "2"
                });
            }
        }
       return next();
};