const factory = require('../factories');
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
beforeEach(async () => {
    await truncate();
});
describe('Authentication', () => {
    it('user should be able make login when he authenticated from web with valid credentials', async () => {
        const qtdUsers = 10;
        const users = await factory.createMany('RandUser', qtdUsers);
        const regId = Math.floor(Math.random() * ((qtdUsers - 1) - 0 + 1)) + 0;
        const response = await request(app)
            .post('/login')
            .send({
                email: users[regId].email,
                password: users[regId].password
            })
            .set('device', 'web');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("expiration");
        expect(response.body.versionPlatform).toBe("comum");
    });

    it('user should be able make login when he authenticated from mobile with valid credentials', async () => {
        const qtdUsers = 10;
        const users = await factory.createMany('RandUser', qtdUsers);
        const regId = Math.floor(Math.random() * ((qtdUsers - 1) - 0 + 1)) + 0;
        const response = await request(app)
            .post('/login')
            .send({
                email: users[regId].email,
                password: users[regId].password
            })
            .set('device', 'mobile');
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty("expiration");
        expect(response.body.versionPlatform).toBe("comum");
    });

    it('admin user should be able make login when he authenticated from web with valid credentials for admin page', async () => {
        const user = await factory.create('User', {
            userLevel: 2
        });
        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
            .set('device', 'web');
        expect(response.status).toBe(200);
        expect(response.body.versionPlatform).toBe("admin");
    });

    it('user should be able not make login when he authenticated with invalid credentials', async () => {
        await factory.create('User');
        const response = await request(app)
            .post('/login')
            .send({
                email: 'invalid@invalid.com',
                password: '1234'
            })
            .set('device', 'web');
        expect(response.body.error).toBe("Utilizador não encontrado!");
        expect(response.status).toBe(401);
    });

    it('user should be able not make login when he not have a device header', async () => {
        const user = await factory.create('User');
        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            });
        expect(response.body.error).toBe("Ops! Ocorreu um erro inesperado!");
        expect(response.status).toBe(400);
    });
    
    it('user should be able not make login when her account is not active', async () => {
        const user = await factory.create('User', {
            ativo: 0
        });
        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
            .set('device', 'web');
        expect(response.status).toBe(405);
        expect(response.body.error).toBe("Conta desativada! Entra em contato com a sua escola!");
    });
});

describe('User Access', () => {

    it('user should be able access private normal user pages when he have a valid token', async () => {
        const user = await factory.create('User');
        const token = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
            .set('device', 'web');
        const response = await request(app)
            .post('/qrcode')
            .send({
                "code": "94ugh9gig"
            })
            .set('Authorization', "EST " + token.body.hash);
        expect(response.status).toBe(200);
    });

    it('user should be able not access private normal user pages when he not have a token', async () => {
        const response = await request(app)
            .post('/qrcode')
            .send({
                "code": "94ugh9gig"
            });
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Utilizador não autenticado!");
    });

    it('user should be able not access private normal user pages when he not have a valid token', async () => {
        const response = await request(app)
            .post('/qrcode')
            .send({
                "code": "94ugh9gig"
            })
            .set('Authorization', "EST " + '123');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Utilizador não autenticado!");
    });

    it('comum user should be able not access private admin pages', async () => {
        const user = await factory.create('User');
        const login = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
            .set('device', 'web');
        const response = await request(app)
            .post('/users')
            .send({
                "nome": "Tomás Dinis Marques Figueiredo",
                "procNumber": "16802",
                "password": "1234",
                "email": "dev.tomas2003@gmail.com",
                "turma": "11A",
                "foto": "default.png"
            })
            .set('Authorization', "EST " + login.body.hash);
            expect(response.status).toBe(403);
            expect(response.body.error).toBe("Area Restrita!");
    });

    it('admin user should be able access private admin pages', async () => {
        const user = await factory.create('User', {
            userLevel: 2
        });
        const login = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
            .set('device', 'web');
        const response = await request(app)
            .post('/users')
            .send({
                "nome": "Tomás Dinis Marques Figueiredo",
                "procNumber": "16802",
                "password": "1234",
                "email": "dev.tomas2003@gmail.com",
                "turma": "11A",
                "foto": "default.png"
            })
            .set('Authorization', "EST " + login.body.hash);
            expect(response.status).toBe(200);
    });

    it('admin user should be able access private admin pages only in web version', async () => {
        const user = await factory.create('User', {
            userLevel: 2
        });
        const login = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
            .set('device', 'mobile');
        const response = await request(app)
            .post('/users')
            .send({
                "nome": "Tomás Dinis Marques Figueiredo",
                "procNumber": "16802",
                "password": "1234",
                "email": "dev.tomas2003@gmail.com",
                "turma": "11A",
                "foto": "default.png"
            })
            .set('Authorization', "EST " + login.body.hash);
            expect(response.body.error).toBe("Por favor, acesse esta rota, por uma sessão na web!");
            expect(response.status).toBe(403);
    });

    it('user should be able not access private normal user pages when he have a valid token but expired', async () => {
        const user = await factory.create('User', {
            userLevel: 2
        });
        const login = await factory.define('createLogin', {
            idUser: user.id,
            expirationTime: moment(new Date()).add(10, 'm').toDate(),
        })
        const response = await request(app)
            .post('/users')
            .send({
                "nome": "Tomás Dinis Marques Figueiredo",
                "procNumber": "16802",
                "password": "1234",
                "email": "dev.tomas2003@gmail.com",
                "turma": "11A",
                "foto": "default.png"
            })
            .set('Authorization', "EST " + login.body.hash);
            expect(response.body.error).toBe("Por favor, acesse esta rota, por uma sessão na web!");
            expect(response.status).toBe(403);
    });
});