'use strict';
const { salas } = require('../models');
const crypto = require('crypto');
module.exports = {
    async store(req, res){
        const { sala } = req.body;
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        await salas.create({
            sala,
            hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
        });
        return res.status(201).json({
            "status": `Sucesso a sala ${sala} foi registada com sucesso!`
        });
    }
};