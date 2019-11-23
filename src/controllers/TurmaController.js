'use strict';
const { Turmas } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        await Turmas.create({
            turma: nome
        });
        return res.status(201).json({
            "status": `Sucesso a turma ${nome} foi registada com sucesso!`
        });
    }
};