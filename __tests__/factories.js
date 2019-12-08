const joker = require('faker');
const { factory } = require('factory-girl');
const crypto = require('crypto');
const moment = require('moment');
const { Utilizadores, Auth } = require('../src/models');
factory.define('User', Utilizadores, {
    nome: 'Tomás Dinis Marques Figueiredo',
    procNumber: '16802',
    password: '1234',
    email: 'dev.tomas2003@gmail.com',
    turma: '11A',
    foto: 'default.png'
});

const classes = Array("A", "B", "C", "D", "E", "F", "G");
const devices = Array("mobile", "web");
const current_date = (new Date()).valueOf().toString();
const random = Math.random().toString();

factory.define('RandUser', Utilizadores, {
    nome: () => joker.name.findName(),
    procNumber: () => (Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111),
    password: () => joker.internet.password(),
    email: () => joker.internet.email(),
    turma: () => ((Math.floor(Math.random() * (12 - 7 + 1)) + 7) + (classes[Math.floor(Math.random() * (6 - 0 + 1)) + 0])),
    foto: 'default.png'
});

factory.define('createLogin', Auth, {
    hash: crypto.createHash('sha1').update(current_date + random).digest('hex'),
    idUser: 1,
    expirationTime: moment(new Date()).add(10, 'm').toDate(),
    device: devices[Math.floor(Math.random() * (1 - 0 + 1)) + 0],
});

module.exports = factory;