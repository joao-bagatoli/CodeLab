const MainController = require('../controllers/main.controller');
const mainService = require('../services/main.service');
const emailService = require('../utils/emailService');
const tokenUtil = require('../utils/tokenUtil');

jest.mock('../services/main.service');
jest.mock('../utils/emailService');
jest.mock('../utils/tokenUtil');

describe('MainController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, session: {}, query: {} };
    res = { render: jest.fn(), redirect: jest.fn() };
    jest.clearAllMocks();
  });

  it('deve retornar erro se o login falhar (credenciais ausentes)', async () => {
    await MainController.login(req, res);
    expect(res.render).toHaveBeenCalledWith('index', { error: 'Email e senha não podem ser vazios' });
  });

  it('deve redirecionar se o login for bem-sucedido', async () => {
    req.body = { email: 'joao@gmail.com', password: '123' };
    mainService.loginAsync.mockResolvedValue({
      user_id: 1, user_name: 'Test', user_email: 'joao@gmail.com', user_admin: 1
    });

    await MainController.login(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/admin/dashboard');
  });

  it('deve gerar erro se o token for inválido em resetPassword', async () => {
    req.query.token = 'abc';
    req.body = { newPassword: '1234', confirmNewPassword: '1234' };
    mainService.getUserByTokenAsync.mockResolvedValue(null);

    await MainController.resetPassword(req, res);
    expect(res.render).toHaveBeenCalledWith('resetPassword', { error: 'Token inválido' });
  });
});
