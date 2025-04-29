const accountController = require('../controllers/accountController');
const accountService = require('../services/accountService');
const statusCodes = require('../utils/statusCodes');

jest.mock('../services/accountService');

describe('accountController.login', () => {
    let req, res;
    beforeEach(() => {
        req = { body: {}, session: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), redirect: jest.fn() };
    });

    it('should return 400 if email or password are empty', async () => {
        req.body = { email: '', password: '' };

        await accountController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email e senha não podem ser vazios' });
    });

    it('should return 401 if the user cannot be found', async () => {
        req.body = { email: 'test@example.com', password: '123' };
        accountService.loginAsync.mockResolvedValue(null);

        await accountController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(statusCodes.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email ou senha inválidos' })
    });
});

describe('accountController.create', () => {
    let req, res;
    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), redirect: jest.fn() };
    });

    it('should return 400 if any field is empty', async () => {
        req.body = { name: 'User', email: 'test@example.com', password: '123', confirmPassword: undefined };

        await accountController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ message: 'Campos devem ser preenchidos' });
    });

    it('should return 400 if password and confirm password do not match', async () => {
        req.body = { name: 'User', email: 'test@example.com', password: '123', confirmPassword: '111' };

        await accountController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ message: 'As senhas não coincidem' });
    });
});