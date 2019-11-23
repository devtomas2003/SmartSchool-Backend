'use strict';
const { Profs } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        await Profs.create({
            nome
        });
        return res.status(201).json({
            "status": `Sucesso o(a) professor ${nome} foi registado com sucesso!`
        });
    }
};