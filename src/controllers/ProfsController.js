'use strict';
const { profs } = require('../models');
module.exports = {
    async store(req, res){
        const { nome, disciplina } = req.body;
        const professores = await profs.create({
            nome,
            disciplina
        });
        return res.json(professores);
    }
};