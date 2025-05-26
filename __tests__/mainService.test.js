const MainService = require('../services/main.service');
const mockConnection = { query: jest.fn() };

global.db = {
  connectDbAsync: jest.fn().mockResolvedValue(mockConnection)
};

describe('MainService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('loginAsync deve retornar usuário válido', async () => {
    const user = { user_email: 'a@a.com', user_password: '123' };
    mockConnection.query.mockResolvedValue([[user]]);

    const result = await MainService.loginAsync('a@a.com', '123');
    expect(result).toEqual(user);
  });

  test('loginAsync deve retornar null para usuário inválido', async () => {
    mockConnection.query.mockResolvedValue([[]]);

    const result = await MainService.loginAsync('b@b.com', '321');
    expect(result).toBeNull();
  });

  test('signUpAsync deve cadastrar usuário', async () => {
    mockConnection.query.mockResolvedValue([{ insertId: 1 }]);

    const result = await MainService.signUpAsync('João', 'joao@email.com', '123');
    expect(mockConnection.query).toHaveBeenCalled();
    expect(result).toEqual({ insertId: 1 });
  });

  test('getUserByEmailAsync deve retornar usuário por email', async () => {
    const user = { user_email: 'teste@email.com' };
    mockConnection.query.mockResolvedValue([[user]]);

    const result = await MainService.getUserByEmailAsync('teste@email.com');
    expect(result).toEqual(user);
  });

  test('getUserByEmailAsync deve retornar null se não achar usuário', async () => {
    mockConnection.query.mockResolvedValue([[]]);

    const result = await MainService.getUserByEmailAsync('x@email.com');
    expect(result).toBeNull();
  });

  test('savePasswordResetTokenAsync deve salvar token de reset', async () => {
    await MainService.savePasswordResetTokenAsync(1, 'tok123', '2025-01-01');
    expect(mockConnection.query).toHaveBeenCalled();
  });

  test('getUserByTokenAsync deve retornar usuário por token', async () => {
    const user = { user_id: 1 };
    mockConnection.query.mockResolvedValue([[user]]);

    const result = await MainService.getUserByTokenAsync('tok123');
    expect(result).toEqual(user);
  });

  test('updatePasswordAsync deve atualizar senha', async () => {
    await MainService.updatePasswordAsync(1, 'newpass');
    expect(mockConnection.query).toHaveBeenCalled();
  });

  test('invalidateTokenAsync deve invalidar token', async () => {
    await MainService.invalidateTokenAsync(1);
    expect(mockConnection.query).toHaveBeenCalled();
  });
});
