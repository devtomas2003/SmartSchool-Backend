const { utilizadores } = require('../../src/models');
describe('Authentication', () => {
    it('user should be able make login when he authenticated with valid credentials', async () => {
        const user = await utilizadores.create({
            nome: 'ABC',
            procNumber: '34',
            password: '3rwesd',
            email: 'sdf',
            turma: 'sdsf',
            foto: 'sdf'
        });
        console.log(user);
        expect(user.email).toBe('sdf');
    });
});