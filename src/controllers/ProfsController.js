'use strict';
const { profs } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        await profs.create({
            nome
        });
        return res.status(201).json({
            "status": "`Sucesso o(a) professor ${nome} foi registado com sucesso!´"
        });
    }
};