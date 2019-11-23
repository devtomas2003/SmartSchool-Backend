        'use strict';
        const { Salas, Profs, Disciplinas, Horarios, Turmas, DiasDaSemana } = require('../models');
        const crypto = require('crypto');
        module.exports = {
            async novaSala(req, res){
                const { sala } = req.body;
                const current_date = (new Date()).valueOf().toString();
                const random = Math.random().toString();
                await Salas.create({
                    sala,
                    hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
                });
                return res.status(201).json({
                    "status": `Sucesso a sala ${sala} foi registada com sucesso!`
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
                await sala.addProfs(prof);
            }
        };