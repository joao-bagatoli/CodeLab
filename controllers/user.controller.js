const userService = require('../services/user.service');

class UserController {
    static async getUsers(req, res) {
        try {
            const user = req.session.user;
            const users = await userService.getUsersAsync();
            return res.render('admin/users', { user, users });
        } catch {
            return res.render('admin/users', { user, users: null });
        }
    }

    static async addUser(req, res) {
        try {
            const { name, email, isAdmin } = req.body;
            const user = { name, email, isAdmin: isAdmin === 'on' ? 1 : 0 };
            await userService.addUserAsync(user);
            res.redirect('/admin/users');
        } catch {
            const userLogged = req.session.user;
            return res.render('admin/users', { user: userLogged, users: null });
        }
    }

    static async updateUser(req, res) {
        try {
            const { isAdmin } = req.body;
            const userId = req.params.id;
            const adminFlag = isAdmin ? 1 : 0;
            await userService.updateUserAsync(userId, adminFlag);
            res.redirect('/admin/users');
        } catch {
            const userLogged = req.session.user;
            return res.render('admin/users', { user: userLogged, users: null });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await userService.deleteUserAsync(userId);
            res.redirect('/admin/users');
        } catch {
            const userLogged = req.session.user;
            return res.render('admin/users', { user: userLogged, users: null });
        }
    }
}

module.exports = UserController;