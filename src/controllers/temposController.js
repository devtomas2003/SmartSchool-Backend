'use strict';
const { Tempos, Horarios, Salas, Profs, Disciplinas, Turmas } = require('../models');
const moment = require('moment');
module.exports = {
    async search(req, res){
        const { time, hashSala } = req.body;
        const sala = await Salas.findOne({ where: { hash: hashSala }});
        const idSala = sala.id;
        const nomeSala = sala.sala;
        var times = new Date(time);
        var day = times.getDay();
        if(day == 6 || day == 7){
            return res.status(200).json({
                "error": "Estás fora do horario letivo!",
                "level": 2,
                "showIn": "box"
            });
        }
        const horario = await Horarios.findAll({ raw: true });
        var outHorario = true;
        var actualTempo = "";
        for(var i = 0; i < horario.length; i++){
            const format = 'hh:mm:ss';
            var now = moment(new Date(time),format);
            var beforeTime = moment(horario[i].startTime, format);
            var afterTime = moment(horario[i].endTime, format);
            if(now.isBetween(beforeTime, afterTime)){
                actualTempo = horario[i].id;
                outHorario = false;
            }
        }
        if(outHorario == true){
            return res.status(200).json({
                "error": `Estás fora do horario letivo!`,
                "level": 2,
                "showIn": "box"
            });
        }
        const searchTime = await Tempos.findOne({ where: { idHora: actualTempo, idSala, idDia: day }});
        if(!searchTime){
            return res.status(200).json({
                "error": `Atualmente não está ninguem na sala ${nomeSala}!`,
                "level": 2,
                "showIn": "box"
            });
        }else{
            const prof = await Profs.findOne({ where: { id: searchTime.idProf }});
            const turma = await Turmas.findOne({ where: { id: searchTime.idTurma }});
            const disciplina = await Disciplinas.findOne({ where: { id: searchTime.idDisciplina }});
            return res.status(200).json({
                "professor": prof.nome,
                "turma": turma.turma,
                "disciplina": disciplina.disciplina
            });
        }
    }
};