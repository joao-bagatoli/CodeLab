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
}

module.exports = UserController;