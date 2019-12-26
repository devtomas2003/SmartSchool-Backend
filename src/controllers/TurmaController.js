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
    },
    async show(req, res){
        const letters = ["Clique aqui para selecionar", "7ºA", "7ºB", "7ºC", "7ºD", "7ºE", "7ºF", "7ºG", "7ºH", "7ºI", "8ºA", "8ºB", "8ºC", "8ºD", "8ºE", "8ºF", "8ºG", "8ºH", "8ºI", "9ºA", "9ºB", "9ºC", "9ºD", "9ºE", "9ºF", "9ºG", "9ºH", "9ºI", "10ºA", "10ºB", "10ºC", "10ºD", "10ºE", "10ºF", "10ºG", "10ºH", "10ºI", "11ºA", "11ºB", "11ºC", "11ºD", "11ºE", "11ºF", "11ºG", "11ºH", "11ºI", "12ºA", "12ºB", "12ºC", "12ºD", "12ºE", "12ºF", "12ºG", "12ºH", "12ºI"];
        return res.status(200).json({
            "turmas": letters
        });
    }
};