'use strict';
const { Utilizadores, UserAtivation } = require('../models');
const mailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
module.exports = {
    async newAccount(req, res){
        const { name, password, mail, turma } = req.body;
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        const findMail = await Utilizadores.findOne({ where: { email: mail } });
        if(findMail){
            return res.status(400).json({
                "error": `Já existe uma conta com este endereço de email (${mail})`,
                "level": 2,
                "showIn": "box"
            });
        }
        if(turma == "Clique aqui para selecionar"){
            return res.status(400).json({
                "error": "Por favor selecione a sua turma",
                "level": 2,
                "showIn": "box"
            });
        }
        const newUser = await Utilizadores.create({
            nome: name,
            password,
            email: mail,
            turma,
            foto: 'default',
            ativo: 0
        });
        const ativation = await UserAtivation.create({
            hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
            userId: newUser.id
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
            to: newUser.email,
            subject: 'Smart School | Ativação de Conta',
            html: `<p>Olá, ${newUser.nome}. Clique no link ao lado para ativar a conta! <a href="${process.env.BASEURL}ativar/${ativation.hash}">Ativar</a></p>`,
        };
        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                return res.status(400).json({
                    "error": "Ocorreu um erro ao tentar ativar a sua conta!",
                    "level": 3,
                    "showIn": "box"
                });
            }else{
                return res.status(201).json({
                    "error": `Conta criada! Verifique a sua caixa de email (${newUser.email}) para ativares a conta!`,
                    "level": 1,
                    "showIn": "box"
                });
            }
        });
    },
    async activateAccount(req, res){
        const { hash } = req.params;
        const tokens = await UserAtivation.findOne({ where: { hash } });
        if(tokens){
            await UserAtivation.destroy({ where: { hash }});
            await Utilizadores.update({ ativo: 1 }, {where: { id: tokens.userId }});
            return res.status(200).send('Conta ativa! Agora já podes iniciar sessão na plataforma da Smart School!');
        }else{
            return res.status(200).send('O Token é invalido! Provavelmente a sua conta já esta ativa! Experimente iniciar sessão na APP!');
        }
    }
};