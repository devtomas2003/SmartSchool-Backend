'use strict';
const { Salas, Profs, Disciplinas, Horarios, Turmas, DiasDaSemana } = require('../models');
const crypto = require('crypto');
module.exports = {
    async novaSala(req, res){
        const { sala } = req.body;
        const upSala = sala.toUpperCase();
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        const newSala = await Salas.create({
            upSala,
            hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
        });
        return res.status(201).json({
            "status": `Sucesso a sala ${upSala} foi registada com sucesso! ID: ${newSala.id}`
        });
    },
    async update(req, res){
        const { id, sala } = req.body;
        const upSala = sala.toUpperCase();
        const salalast = await Salas.findByPk(id);
        if(!salalast){
            return res.status(404).json({
                "status": `A sala com o id ${id} não existe!`
            });
        }
        await Salas.update({
            upSala
        },{
            where: { id }
        });
        return res.status(200).json({
            "status": `Sucesso a sala com o nome ${salalast.sala} foi alterada para ${upSala}`
        });
    },
    async horario(req, res){
        const { idHora, idSala, idDia, idDisciplina, idProf, idTurma } = req.body;
        const prof = await Profs.findByPk(idProf);
        if(!prof){
            return res.status(404).json({
                "status": `O professor com o id ${idProf} não existe!`
            });
        }
        const sala = await Salas.findByPk(idSala);
        if(!sala){
            return res.status(404).json({
                "status": `A sala com o id ${idSala} não existe!`
            });
        }
        const turma = await Turmas.findByPk(idTurma);
        if(!turma){
            return res.status(404).json({
                "status": `A turma com o id ${idTurma} não existe!`
            });
        }
        const disciplina = await Disciplinas.findByPk(idDisciplina);
        if(!disciplina){
            return res.status(404).json({
                "status": `A disciplina com o id ${idDisciplina} não existe!`
            });
        }
        const hora = await Horarios.findByPk(idHora);
        if(!hora){
            return res.status(404).json({
                "status": `O espaço/tempo com o id ${idHora} não existe!`
            });
        }
        const dia = await DiasDaSemana.findByPk(idDia);
        if(!dia){
            return res.status(404).json({
                "status": `O dia com o id ${idDia} não existe!`
            });
        }
        //Salas
        await sala.addProfssala(prof);
        await sala.addTurmasSala(turma);
        await sala.addSalasdisciplina(disciplina);
        await sala.addSalashorario(hora);
        await sala.addSalasDia(dia);
        //Profs
        await prof.addDisciplinasProf(disciplina);
        await prof.addTurmasProf(turma);
        // Disciplinas
        await disciplina.addTurmasDisciplina(turma);

        return res.status(201).json({
            "status": `Sucesso o horario foi criado com sucesso!`
        });

    }
};