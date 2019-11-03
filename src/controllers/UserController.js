'use strict';
const { utilizadores } = require('../models');
module.exports = {
    async store(req, res){
        const { nome, procNumber, password, email, turma, foto } = req.body;
        const user = await utilizadores.create({
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