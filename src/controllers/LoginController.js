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
                "level": 3
            });
        }
        if(userFinded.ativo != 1){
            return res.status(405).json({
                "error": "Conta desativada! Entra em contato com a sua escola!",
                "level": 2
            });
        }
        if(!device){
            return res.status(400).json({
                "error": "Ops! Ocorreu um erro inesperado!",
                "level": 3
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
                "versionPlatform": "comum"
            });
        }
    }
};