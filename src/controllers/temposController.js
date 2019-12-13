'use strict';
const { Tempos, Horarios } = require('../models');
const moment = require('moment');
module.exports = {
    async search(req, res){
        const { time, sala } = req.body;
        var times = new Date(time);
        //var day = times.getDay();
        const horario = await Horarios.findAll();
        console.log(horario);
        //moment(time).isBetween('', '');
    }
};