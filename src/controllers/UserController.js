'use strict';
const User = require('../models/User');
module.exports = {
    async store(req, res){
        const { nome, procNumber, password, email, turma, foto } = req.body;
        const user = await User.create({
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