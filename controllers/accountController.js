const accountService = require('../services/accountService');
const emailService = require('../utils/emailService');
const statusCodes  = require('../utils/statusCodes');
const { generateResetToken } = require('../utils/tokenUtil');

class AccountController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email e senha não podem ser vazios' });
            }

            const user = await accountService.loginAsync(email, password);

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
    
            const result = await accountService.createAsync(name, email, password);
    
            if (result.insertId) {
                return res.redirect('/');
            }

            return res.status(statusCodes.InternalServerError).json({ message: 'Falha ao criar usuário' });
        } catch {
            res.status(statusCodes.InternalServerError).json({ message: 'Erro ao criar conta' });
        }
    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email não pode ser vazio' });
            }

            const user = await accountService.getUserByEmailAsync(email);

            if (!user) {
                return res.status(statusCodes.NOT_FOUND).json({ message: 'Email não encontrado' });
            }

            const token = generateResetToken();
            const ONE_HOUR_IN_MS = 3600000;
            const expiration = new Date(Date.now() + ONE_HOUR_IN_MS);

            await accountService.savePasswordResetTokenAsync(user.user_id, token, expiration);

            const resetLink = `http://localhost:3000/reset-password?token=${token}`;

            await emailService.sendResetEmailAsync(email, resetLink);

            return res.json({ message: 'Link de recuperação enviado para o email' });
        } catch {
            res.status(statusCodes.InternalServerError).json({ message: 'Erro ao enviar link de redefinição' });
        }
    }
}

module.exports = AccountController;