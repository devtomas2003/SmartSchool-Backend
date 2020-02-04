'use strict';
const { Disciplinas, Horarios, Profs, Salas, Tempos, Turmas, DiasDaSemana, Auth, versions, Utilizadores } = require('../models');
const crypto = require('crypto');
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
module.exports = {
    async getOffline(req, res){
        const getDisciplinas = await Disciplinas.findAll({ raw: true });
        const getHorarios = await Horarios.findAll({ raw: true });
        const getDiasDaSemana = await DiasDaSemana.findAll({ raw: true });
        const getProfs = await Profs.findAll({ raw: true });
        const getSalas = await Salas.findAll({ raw: true });
        const getTempos = await Tempos.findAll({ raw: true });
        const getTurmas = await Turmas.findAll({ raw: true });

        return res.status(200).json({
            "disciplinas": getDisciplinas,
            "horarios": getHorarios,
            "diasDaSemana": getDiasDaSemana,
            "profs": getProfs,
            "salas": getSalas,
            "tempos": getTempos,
            "turmas": getTurmas
        });
    },
    async getHash(req, res){
        const authHeader = req.headers.authorization;
        const [, token] = authHeader.split(" ");
        const verifyToken = await Auth.findOne({ where: { hash: token }});
        const getUserCheckIntegrity = await Utilizadores.findByPk(verifyToken.idUser);
        const hashSum = await versions.findAll({ raw: true });
        const chave = crypto.createHash('sha1').update(hashSum[0].tablesChecksum + getUserCheckIntegrity.checksum).digest('hex');
        return res.status(200).json({
            "hashIntegrity": chave
        });
    }
};