const UserController = require('../controllers/user.controller');
const userService = require('../services/user.service');

jest.mock('../services/user.service');

describe('UserController', () => {
  const req = { session: { user: { id: 1 } }, body: {}, params: {} };
  const res = { render: jest.fn(), redirect: jest.fn() };

  beforeEach(() => jest.clearAllMocks());

  it('deve renderizar a página de usuários com a lista', async () => {
    const users = [{ id: 1, name: 'User' }];
    userService.getUsersAsync.mockResolvedValue(users);

    await UserController.getUsers(req, res);
    expect(res.render).toHaveBeenCalledWith('admin/users', { user: req.session.user, users });
  });

  it('deve chamar addUser e redirecionar', async () => {
    req.body = { name: 'A', email: 'B', isAdmin: 'on' };
    await UserController.addUser(req, res);
    expect(userService.addUserAsync).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/admin/users');
  });
});
