'use strict';
const { Auth } = require('../models');
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            "error": "Utilizador não autenticado!",
            "level": "3"
        });
    }
        const [, token] = authHeader.split(" ");
        const verifyToken = await Auth.findOne({ where: { hash: token }, include: { association: 'userrelation' }});
        if(!verifyToken){
            return res.status(401).json({
                "error": "Utilizador não autenticado!",
                "level": "3"
            });
        }else{
            const level = verifyToken.userrelation.userLevel;
            if(level == 1){
                return res.status(403).json({
                    "error": "Area Restrita!",
                    "level": "3"
                });
            }else{
                const deviceHeader = verifyToken.device;
                if(deviceHeader == "mobile"){
                    return res.status(403).json({
                        "error": "Por favor, acesse esta rota, por uma sessão na web!",
                        "level": "2"
                    });
                }
            }
        }
       return next();


};