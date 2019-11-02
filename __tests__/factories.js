const faker = require('faker');
const { factory } = require('factory-girl');
const { utilizadores } = require('../src/models');

factory.define('User', utilizadores, {
    nome: 'Tomás Dinis Marques Figueiredo',
    procNumber: '16802',
    password: '1234',
    email: 'dev.tomas2003@gmail.com',
    turma: '11A',
    foto: 'default.png'
})

const classes = Array("A", "B", "C", "D", "E", "F", "G");

factory.define('RandUser', utilizadores, {
    nome: () => faker.name.findName(),
    procNumber: () => (Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111),
    password: () => faker.internet.password(),
    email: () => faker.internet.email(),
    turma: () => ((Math.floor(Math.random() * (12 - 7 + 1)) + 7) + (classes[Math.floor(Math.random() * (6 - 0 + 1)) + 0])),
    foto: 'default.png'
})

module.exports = factory;