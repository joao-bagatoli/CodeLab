const mainService = require('../services/main.service');
const emailService = require('../utils/emailService');
const { generateResetToken } = require('../utils/tokenUtil');

class MainController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.render('index', { error: 'Email e senha não podem ser vazios' });
            }

            const user = await mainService.loginAsync(email, password);

            if (!user) {
                return res.render('index', { error: 'Credenciais inválidas' });
            }

            req.session.user = {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email,
                isAdmin: user.user_admin == 1
            };

            const redirectTo = user.user_admin == 1 ? '/admin/dashboard' : '/challenges';
            res.redirect(redirectTo);
        } catch {
            return res.render('index', { error: 'Erro ao realizar login' });
        }
    }

    static async signUp(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            if (!name || !email || !password || !confirmPassword) {
                return res.render('signUp', { error: 'Campos devem ser preenchidos' });
            }
    
            if (password !== confirmPassword) {
                return res.render('signUp', { error: 'As senhas não coincidem' });
            }
    
            const result = await mainService.signUpAsync(name, email, password);
    
            if (result.insertId) {
                return res.redirect('/');
            }

            return res.render('signUp', { error: 'Falha ao criar usuário' });
        } catch {
            return res.render('signUp', { error: 'Erro ao criar conta' });
        }
    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.render('forgotPassword', { error: 'Email não pode ser vazio', success: null });
            }

            const user = await mainService.getUserByEmailAsync(email);

            if (!user) {
                return res.render('forgotPassword', { error: 'Email não encontrado', success: null });
            }

            const token = generateResetToken();
            const ONE_HOUR_IN_MS = 3600000;
            const expiration = new Date(Date.now() + ONE_HOUR_IN_MS);

            await mainService.savePasswordResetTokenAsync(user.user_id, token, expiration);

            const resetLink = `http://localhost:3000/reset-password?token=${token}`;

            await emailService.sendResetEmailAsync(email, resetLink);

            return res.render('forgotPassword', { error: null, success: 'Link de recuperação enviado para o email' });
        } catch {
            return res.render('forgotPassword', { error: 'Erro ao enviar link de redefinição', success: null });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token } = req.query;
            const { newPassword, confirmNewPassword } = req.body;

            if (!token) {
                return res.render('resetPassword', { error: 'Token não deve ser nulo' });
            }

            if (!newPassword || !confirmNewPassword) {
                return res.render('resetPassword', { error: 'Campos devem ser preenchidos' });
            }

            if (newPassword !== confirmNewPassword) {
                return res.render('resetPassword', { error: 'As senhas não coincidem' });
            }

            const user = await mainService.getUserByTokenAsync(token);

            if (!user) {
                return res.render('resetPassword', { error: 'Token inválido' });
            }

            const isTokenExpired = new Date(user.reset_token_expiration) < new Date();

            if (isTokenExpired) {
                return res.render('resetPassword', { error: 'Token expirado' });
            }

            await mainService.updatePasswordAsync(user.user_id, newPassword);
            await mainService.invalidateTokenAsync(user.user_id);

            return res.redirect('/password-reset-success');
        } catch {
            return res.render('resetPassword', { error: 'Erro ao redefinir senha' });
        }
    }
}

module.exports = MainController;