'use strict';
const { Turmas } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        const upName = nome.toUpperCase();
        const turma = await Turmas.create({
            turma: upName
        });
        return res.status(201).json({
            "status": `Sucesso a turma ${upName} foi registada com sucesso! ID: ${turma.id}`
        });
    },
    async update(req, res){
        const { id, nome } = req.body;
        const upName = nome.toUpperCase();
        const turmalast = await Turmas.findByPk(id);
        if(!turmalast){
            return res.status(404).json({
                "status": `A turma com o id ${id} não existe!`
            });
        }
        await Turmas.update({
            turma: upName
        },{
            where: { id }
        });
        return res.status(200).json({
            "status": `Sucesso a turma com o nome ${turmalast.turma} foi alterada para ${upName}`
        });
    }
};