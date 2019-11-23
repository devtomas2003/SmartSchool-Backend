'use strict';
const { Recuperation } = require('../models');
const mailer = require('nodemailer');
module.exports = {
    async index(req, res){
        const remetente = mailer.createTransport({
            host: 'stmp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
            user: 'immtelecom@gmail.com',
            pass: 'Carac0l1234' }
        });
        const emailASerEnviado = {
            from: 'immtelecom@gmail.com',
            to: 'dev.tomas2003@gmail.com',
            subject: 'Smart School | Recuperação de Password',
            html: '<img src="https://d1cr57qij2cwzh.cloudfront.net/wp-content/uploads/2019/05/EOA_BackgroundColorsImages2019_Blog.gif" /><p>O antonio é gay!</p></div>',
        };
        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
            console.log(error);
            } else {
            console.log('Email enviado com sucesso.');
            }
            });
    }
};