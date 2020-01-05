'use strict';
const { Utilizadores, Auth } = require('../models');
const crypto = require('crypto');
const moment = require('moment');
module.exports = {
    async index(req, res){
        const { email, password } = req.body;
        const { device } = req.headers;
        const userFinded = await Utilizadores.findOne({
            where: {
                email,
                password,
            }
        });
        if(!userFinded){
            return res.status(401).json({
                "error": "Utilizador não encontrado!",
                "level": 3,
                "showIn": "text"
            });
        }
        if(userFinded.ativo != 1){
            return res.status(405).json({
                "error": "Conta desativada! Entra em contato com a sua escola!",
                "level": 2,
                "showIn": "box"
            });
        }
        if(!device){
            return res.status(400).json({
                "error": "Ops! Ocorreu um erro inesperado!",
                "level": 3,
                "showIn": "box"
            });
        }
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        if(device == "web"){
            const authenticate = await Auth.create({
                hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
                idUser: userFinded.id,
                expirationTime: moment(new Date()).add(10, 'm').toDate(),
                device
            });
            var level;
            if(userFinded.userLevel == 1){ level = "comum"; }else{ level = "admin"; }
            return res.status(200).json({
                "hash": authenticate.hash,
                "expiration": authenticate.expirationTime,
                "recuperated": userFinded.recuperated,
                "name": userFinded.nome,
                "versionPlatform": level
            });
        }else{
            const hash = await Auth.create({
                hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
                idUser: userFinded.id,
                device
            });
            return res.json({
                "hash": hash.hash,
                "name": userFinded.nome,
                "recuperated": userFinded.recuperated,
                "versionPlatform": "comum"
            });
        }
    },
    async search(req, res){
        const { authorization } = req.headers;
        const [, token] = authorization.split(" ");
        const verifyToken = await Auth.findOne({ where: { hash: token }});
        const userId = verifyToken.idUser;
        const getUser = await Utilizadores.findByPk(userId);
        const name = getUser.nome;
        const recuperated = getUser.recuperated;
        return res.json({
            name,
            recuperated
        });
    },
    async reset(req, res){
        const { password } = req.body;
        const { authorization } = req.headers;
        const [, token] = authorization.split(" ");
        const verifyToken = await Auth.findOne({ where: { hash: token }});
        const userId = verifyToken.idUser;
        await Utilizadores.update({
            recuperated: 0,
            password
        },{
            where: { id: userId }
        });
        return res.status(200).json({
            "error": `A nova password foi definida!`,
            "level": 1,
            "showIn": "box"
        });
    }
};