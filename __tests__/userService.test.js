const UserService = require('../services/user.service');
const mockConnection = { query: jest.fn() };

global.db = {
  connectDbAsync: jest.fn().mockResolvedValue(mockConnection)
};

describe('UserService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getUsersAsync deve retornar todos os usuários', async () => {
    const users = [{ user_id: 1, user_name: 'João' }];
    mockConnection.query.mockResolvedValue([users]);

    const result = await UserService.getUsersAsync();
    expect(result).toEqual(users);
  });

  test('addUserAsync deve adicionar usuário', async () => {
    const user = { name: 'Maria', email: 'maria@email.com', isAdmin: 0 };

    await UserService.addUserAsync(user);
    expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO users'), [
      user.name, user.email, user.isAdmin
    ]);
  });

  test('updateUserAsync deve atualizar permissão de usuário', async () => {
    await UserService.updateUserAsync(1, 1);
    expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE users'), [1, 1]);
  });

  test('deleteUserAsync deve deletar usuário', async () => {
    await UserService.deleteUserAsync(2);
    expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM users'), [2]);
  });
});
