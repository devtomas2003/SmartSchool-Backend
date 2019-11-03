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
       return next();


};