'use strict';
const { RecuperationPass, Utilizadores, Auth } = require('../models');
const mailer = require('nodemailer');
const moment = require('moment');
const crypto = require('crypto');
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
module.exports = {
    async recoverAccount(req, res){
        const { mail } = req.body;
        const users = await Utilizadores.findOne({ where: { email: mail } });
        if(!users){
            return res.status(201).json({
                "error": `Não encontramos nenhuma conta com este endereço de email (${mail})`,
                "level": 3,
                "showIn": "box"
            });
        }
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        const recuperation = await RecuperationPass.create({
            hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
            idUser: users.id,
            expirationTime: moment(new Date()).add(5, 'm').toDate(),
            ativo: 1
        });
        const remetente = mailer.createTransport({
            host: 'stmp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASS }
        });
        const emailASerEnviado = {
            from: process.env.MAILUSER,
            to: mail,
            subject: 'Smart School | Recuperação de Password',
            html: `<p>Olá, ${users.nome}. Clique no link ao lado para recuperares a tua conta! <a href="${process.env.BASEURL}getPass/${recuperation.hash}">Recuperar</a> Caso não tenhas pedido a recuperação de password, ignora esta email!</p>`,
        };
        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                return res.status(201).json({
                    "error": "Ocorreu um erro ao tentar recuperar a sua conta!",
                    "level": 3,
                    "showIn": "box"
                });
            }else{
                return res.status(201).json({
                    "error": `Conta em recuperação! Verifique a sua caixa de email (${mail}) para recuperares a conta!`,
                    "level": 1,
                    "showIn": "box"
                });
            }
        });
    },
    async getPass(req, res){
        const { hash } = req.params;
        const recuperations = await RecuperationPass.findOne({ where: { hash } });
        if(!recuperations){
            return res.status(200).send("O Token é invalido! Provavelmente a password já foi enviada para o seu e-mail!");
        }
        const expireTo = new Date(recuperations.expirationTime);
        const now = new Date();
        if(now >= expireTo){
            return res.status(200).send("O Token é invalido! Tempo maximo atingido!");
        }
        await RecuperationPass.destroy({ where: { hash }});
        function randomstring(L) {
            var s = '';
            var randomchar = function() {
              var n = Math.floor(Math.random() * 62);
              if (n < 10) return n;
              if (n < 36) return String.fromCharCode(n + 55);
              return String.fromCharCode(n + 61);
            }
            while (s.length < L) s += randomchar();
            return s;
          }
          const newPass = randomstring(10);
        await Utilizadores.update({ password: newPass, recuperated: 1 }, { where: { id: recuperations.idUser }});
        const setPassw = await Utilizadores.findOne({ where: { id: recuperations.idUser }});
        const remetente = mailer.createTransport({
            host: 'stmp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASS }
        });
        const emailASerEnviado = {
            from: process.env.MAILUSER,
            to: setPassw.email,
            subject: 'Smart School | Recuperação de Password',
            html: `<p>Olá, ${setPassw.nome}. A sua nova password é: ${newPass} Após iniciar sessão na plataforma será pedido para alterares a password!</p>`,
        };
        await Auth.destroy({ where: { hash }});
        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                return res.status(200).send("Ocorreu um erro ao tentar recuperar a sua conta!");
            }else{
                return res.status(200).send("A nova password foi enviada para o seu email!");
            }
        });
    }
};