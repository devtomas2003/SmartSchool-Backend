'use strict';
const Prof = require('../models/Profs');
module.exports = {
    async store(req, res){
        const { nome, disciplina } = req.body;
        const profs = await Prof.create({
            nome,
            disciplina
        });
        return res.json(profs);
    }
};