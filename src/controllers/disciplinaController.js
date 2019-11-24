'use strict';
const { Disciplinas } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        const disciplina = await Disciplinas.create({
            disciplina: nome
        });
        return res.status(201).json({
            "status": `Sucesso a disciplina ${nome} foi registada com sucesso! ID: ${disciplina.id}`
        });
    },
    async update(req, res){
        const { id, nome } = req.body;
        const disciplinalast = await Disciplinas.findByPk(id);
        if(!disciplinalast){
            return res.status(404).json({
                "status": `A disciplina com o id ${id} não existe!`
            });
        }
        await Disciplinas.update({
            disciplina: nome
        },{
            where: { id }
        });
        return res.status(200).json({
            "status": `Sucesso a disciplina com o nome ${disciplinalast.disciplina} foi alterada para ${nome}`
        });
    }
};