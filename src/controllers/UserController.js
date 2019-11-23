'use strict';
const { Utilizadores } = require('../models');
module.exports = {
    async store(req, res){
        const { nome, procNumber, password, email, turma, foto } = req.body;
        const user = await Utilizadores.create({
            nome,
            procNumber,
            password,
            email,
            turma,
            foto
        });
        return res.json(user);
    }
};