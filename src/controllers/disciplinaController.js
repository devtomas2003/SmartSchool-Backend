'use strict';
const { Disciplinas } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        await Disciplinas.create({
            disciplina: nome
        });
        return res.status(201).json({
            "status": `Sucesso a disciplina ${nome} foi registada com sucesso!`
        });
    }
};