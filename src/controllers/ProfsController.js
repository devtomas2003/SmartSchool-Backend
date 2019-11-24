'use strict';
const { Profs } = require('../models');
module.exports = {
    async store(req, res){
        const { nome } = req.body;
        const prof = await Profs.create({
            nome
        });
        return res.status(201).json({
            "status": `Sucesso o(a) professor ${nome} foi registado com sucesso! ID: ${prof.id}`
        });
    },
    async update(req, res){
        const { id, nome } = req.body;
        const profslast = await Profs.findByPk(id);
        if(!profslast){
            return res.status(404).json({
                "status": `O professor com o id ${id} não existe!`
            });
        }
        await Profs.update({
            nome
        },{
            where: { id }
        });
        return res.status(200).json({
            "status": `Sucesso o(a) prof com o nome ${profslast.nome} foi alterado para ${nome}`
        });
    }
};