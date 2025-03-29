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
        } catch {
            res.status(statusCodes.InternalServerError).json({ message: 'Erro ao realizar login' });
        }
    }

    static async create(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            if (!name || !email || !password || !confirmPassword) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Campos devem ser preenchidos' });
            }
    
            if (password !== confirmPassword) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'As senhas não coincidem' });
            }
    
            const result = await service.createAsync(name, email, password);
    
            if (result.insertId) {
                return res.redirect('/');
            }

            return res.status(statusCodes.InternalServerError).json({ message: 'Falha ao criar usuário' });
        } catch {
            res.status(statusCodes.InternalServerError).json({ message: 'Erro ao criar conta' });
        }
    }
}

module.exports = AccountController;