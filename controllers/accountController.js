const service = require('../services/accountService');
const statusCodes  = require('../utils/statusCodes');

class AccountController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email e senha não podem ser vazios' });
            }

            const user = await service.loginAsync(email, password);

            if (!user) {
                return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Email ou senha inválidos' });
            }

            res.redirect('/home');
        } catch(error) {
            res.status(statusCodes.InternalServerError).json({ message: 'Erro ao realizar login' });
        }
    }
}

module.exports = AccountController;