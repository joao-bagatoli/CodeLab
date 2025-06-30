const mainController = require('../controllers/main.controller');
const mainService = require('../services/main.service');
const emailService = require('../utils/emailService');

jest.mock('../services/main.service');
jest.mock('../utils/emailService');

describe('mainController.requestPasswordReset', () => {
  it('deve enviar link de redefinição quando email for válido', async () => {
    const req = { body: { email: 'user@email.com' } };
    const res = { render: jest.fn() };

    mainService.getUserByEmail.mockResolvedValue({ id: 1, name: 'User' });
    mainService.generateResetToken.mockResolvedValue('token123');
    emailService.sendResetEmailAsync.mockResolvedValue(true);

    await mainController.requestPasswordReset(req, res);

    expect(mainService.getUserByEmail).toHaveBeenCalledWith('user@email.com');
    expect(mainService.generateResetToken).toHaveBeenCalledWith(1);
    expect(emailService.sendResetEmailAsync).toHaveBeenCalledWith('user@email.com', expect.stringContaining('token123'));
    expect(res.render).toHaveBeenCalledWith('password-reset-request', { success: 'Link de redefinição enviado.' });
  });

  it('deve retornar erro se e-mail for inválido', async () => {
    const req = { body: { email: 'naoencontrado@email.com' } };
    const res = { render: jest.fn() };

    mainService.getUserByEmail.mockResolvedValue(null);

    await mainController.requestPasswordReset(req, res);

    expect(res.render).toHaveBeenCalledWith('password-reset-request', { error: 'E-mail não encontrado.' });
  });
});
