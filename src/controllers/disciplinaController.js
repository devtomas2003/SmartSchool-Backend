'use strict';
const { disciplinas } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        await disciplinas.create({
            disciplina: nome
        });
        return res.status(201).json({
            "status": `Sucesso a disciplina ${nome} foi registada com sucesso!`
        });
    }
};