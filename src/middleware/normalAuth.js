'use strict';
const { Auth } = require('../models');
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            "error": "Utilizador não autenticado!",
            "level": "3",
            "showIn": "box"
        });
    }
        const [, token] = authHeader.split(" ");
        const verifyToken = await Auth.findOne({ where: { hash: token }});
        if(!verifyToken){
            return res.status(401).json({
                "error": "Utilizador não autenticado!",
                "level": "3",
                "showIn": "box"
            });
        }
        if(verifyToken.device == "web"){
            const expireTo = new Date(verifyToken.expirationTime);
            const now = new Date();
            if(now >= expireTo){
                return res.status(401).json({
                    "error": "Sessão expirada! Inicie novamente sessão!",
                    "level": "2",
                    "showIn": "box"
                });
            }
        }
       return next();
};