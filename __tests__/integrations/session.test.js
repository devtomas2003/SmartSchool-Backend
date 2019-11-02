const factory = require('../factories');
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });
    it('user should be able make login when he authenticated with valid credentials', async () => {
        const qtdUsers = 10;
        const users = await factory.createMany('RandUser', qtdUsers);
        const regId = Math.floor(Math.random() * ((qtdUsers - 1) - 0 + 1)) + 0;
        const response = await request(app)
            .post('/login')
            .send({
                email: users[regId].email,
                password: users[regId].password
            })
            .set('device', 'web')
        expect(response.status).toBe(200);
    });
    it('user should be able not make login when he authenticated with invalid credentials', async () => {
        await factory.create('User');
        const response = await request(app)
            .post('/login')
            .send({
                email: 'invalid@invalid.com',
                password: '1234'
            })
            .set('device', 'web')
        expect(response.status).toBe(401);
    });
    it('user should be able not make login when he not have a device header', async () => {
        const user = await factory.create('User');
        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: user.password
            })
        expect(response.status).toBe(400);
    });
});