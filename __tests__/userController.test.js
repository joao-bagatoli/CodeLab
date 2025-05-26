const userService = require('../../services/user.service');
const UserController = require('../../controllers/user.controller');

jest.mock('../../services/user.service');

describe('UserController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      session: { user: { id: 1, name: 'Admin' } },
      body: {},
      params: {}
    };

    res = {
      render: jest.fn(),
      redirect: jest.fn()
    };
  });

  describe('getUsers', () => {
    it('deve renderizar usuários corretamente', async () => {
      userService.getUsersAsync.mockResolvedValue([{ id: 1, name: 'User1' }]);
      await UserController.getUsers(req, res);

      expect(res.render).toHaveBeenCalledWith('admin/users', {
        user: req.session.user,
        users: [{ id: 1, name: 'User1' }]
      });
    });

    it('deve tratar erro e renderizar com null', async () => {
      userService.getUsersAsync.mockRejectedValue(new Error());
      await UserController.getUsers(req, res);

      expect(res.render).toHaveBeenCalledWith('admin/users', {
        user: req.session.user,
        users: null
      });
    });
  });

  describe('addUser', () => {
    it('deve adicionar usuário e redirecionar', async () => {
      req.body = { name: 'Novo', email: 'novo@email.com', isAdmin: 'on' };

      await UserController.addUser(req, res);

      expect(userService.addUserAsync).toHaveBeenCalledWith({
        name: 'Novo',
        email: 'novo@email.com',
        isAdmin: 1
      });
      expect(res.redirect).toHaveBeenCalledWith('/admin/users');
    });

    it('deve tratar erro ao adicionar e renderizar', async () => {
      req.body = { name: 'Novo', email: 'novo@email.com', isAdmin: 'on' };
      userService.addUserAsync.mockRejectedValue(new Error());

      await UserController.addUser(req, res);

      expect(res.render).toHaveBeenCalledWith('admin/users', {
        user: req.session.user,
        users: null
      });
    });
  });

  describe('updateUser', () => {
    it('deve atualizar usuário e redirecionar', async () => {
      req.body = { isAdmin: 'off' };
      req.params.id = 5;

      await UserController.updateUser(req, res);

      expect(userService.updateUserAsync).toHaveBeenCalledWith(5, 0);
      expect(res.redirect).toHaveBeenCalledWith('/admin/users');
    });

    it('deve tratar erro ao atualizar e renderizar', async () => {
      req.body = { isAdmin: 'on' };
      req.params.id = 7;

      userService.updateUserAsync.mockRejectedValue(new Error());

      await UserController.updateUser(req, res);

      expect(res.render).toHaveBeenCalledWith('admin/users', {
        user: req.session.user,
        users: null
      });
    });
  });

  describe('deleteUser', () => {
    it('deve deletar usuário e redirecionar', async () => {
      req.params.id = 3;

      await UserController.deleteUser(req, res);

      expect(userService.deleteUserAsync).toHaveBeenCalledWith(3);
      expect(res.redirect).toHaveBeenCalledWith('/admin/users');
    });

    it('deve tratar erro ao deletar e renderizar', async () => {
      req.params.id = 9;

      userService.deleteUserAsync.mockRejectedValue(new Error());

      await UserController.deleteUser(req, res);

      expect(res.render).toHaveBeenCalledWith('admin/users', {
        user: req.session.user,
        users: null
      });
    });
  });
});
