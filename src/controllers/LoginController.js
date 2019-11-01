'use strict';
const User = require('../models/User');
const Hash = require('../models/auth');
const crypto = require('crypto');
const moment = require('moment');
module.exports = {
    async index(req, res){
        const { email, password } = req.body;
        const { device } = req.headers;
        const userFinded = await User.findOne({
            where: {
                email,
                password,
            }
        });
        if(!userFinded){
            return res.status(404).json({
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
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        if(device == "pc"){
            const hash = await Hash.create({
                hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
                idUser: userFinded.id,
                expirationTime: moment(new Date()).add(10, 'm').toDate(),
                device
            });
            return res.json({
                "hash": hash.hash,
                "expiration": hash.expirationTime
            });
        }else{
            const hash = await Hash.create({
                hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
                idUser: userFinded.id,
                device
            });
            return res.json({
                "hash": hash.hash,
            });
        }
    }
};