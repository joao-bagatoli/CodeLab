const userService = require('../services/user.service');

class UserController {
    static async getUsers(req, res) {
        const userLogged = req.session.user;

        try {
            const users = await userService.getUsersAsync();
            return res.render('admin/users', { user: userLogged, users, error: null });
        } catch {
            return res.render('admin/users', { user: userLogged, users: [], error: 'Erro ao carregar usuários' });
        }
    }

    static async addUser(req, res) {
        const userLogged = req.session.user;

        try {
            const { name, email, isAdmin } = req.body;
            const user = { name, email, isAdmin: isAdmin === 'on' ? 1 : 0 };
            await userService.addUserAsync(user);
            res.redirect('/admin/users');
        } catch {
            return res.render('admin/users', { user: userLogged, users: [], error: 'Erro ao adicionar usuário' });
        }
    }

    static async updateUser(req, res) {
        const userLogged = req.session.user;

        try {
            const { isAdmin } = req.body;
            const userId = req.params.id;
            const adminFlag = isAdmin ? 1 : 0;
            await userService.updateUserAsync(userId, adminFlag);
            res.redirect('/admin/users');
        } catch {
            return res.render('admin/users', { user: userLogged, users: [], error: 'Erro ao atualizar usuário' });
        }
    }

    static async deleteUser(req, res) {
        const userLogged = req.session.user;

        try {
            const userId = req.params.id;
            await userService.deleteUserAsync(userId);
            res.redirect('/admin/users');
        } catch {
            return res.render('admin/users', { user: userLogged, users: [], error: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = UserController;