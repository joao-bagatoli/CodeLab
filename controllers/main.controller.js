const mainService = require('../services/main.service');
const emailService = require('../utils/emailService');
const statusCodes  = require('../utils/statusCodes');
const { generateResetToken } = require('../utils/tokenUtil');

class MainController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email e senha não podem ser vazios' });
            }

            const user = await mainService.loginAsync(email, password);

            if (!user) {
                return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Email ou senha inválidos' });
            }

            req.session.user = {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email
            };

            res.redirect('/challenges');
        } catch {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao realizar login' });
        }
    }

    static async signUp(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            if (!name || !email || !password || !confirmPassword) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Campos devem ser preenchidos' });
            }
    
            if (password !== confirmPassword) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'As senhas não coincidem' });
            }
    
            const result = await mainService.createAsync(name, email, password);
    
            if (result.insertId) {
                return res.redirect('/');
            }

            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Falha ao criar usuário' });
        } catch {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao criar conta' });
        }
    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Email não pode ser vazio' });
            }

            const user = await mainService.getUserByEmailAsync(email);

            if (!user) {
                return res.status(statusCodes.NOT_FOUND).json({ message: 'Email não encontrado' });
            }

            const token = generateResetToken();
            const ONE_HOUR_IN_MS = 3600000;
            const expiration = new Date(Date.now() + ONE_HOUR_IN_MS);

            await mainService.savePasswordResetTokenAsync(user.user_id, token, expiration);

            const resetLink = `http://localhost:3000/reset-password?token=${token}`;

            await emailService.sendResetEmailAsync(email, resetLink);

            return res.json({ message: 'Link de recuperação enviado para o email' });
        } catch {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao enviar link de redefinição' });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token } = req.query;
            const { newPassword, confirmNewPassword } = req.body;

            if (!token) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Token não deve ser nulo' });
            }

            if (!newPassword || !confirmNewPassword) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Campos devem ser preenchidos' });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'As senhas não coincidem' });
            }

            const user = await mainService.getUserByTokenAsync(token);

            if (!user) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Token inválido' });
            }

            const isTokenExpired = new Date(user.reset_token_expiration) < new Date();

            if (isTokenExpired) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: 'Token expirado' });
            }

            await mainService.updatePasswordAsync(user.user_id, newPassword);
            await mainService.invalidateTokenAsync(user.user_id);

            return res.redirect('/password-reset-success');
        } catch {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao redefinir senha' });
        }
    }
}

module.exports = MainController;