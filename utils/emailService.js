const nodemailer = require('nodemailer');

class EmailService {
    async sendResetEmailAsync(email, resetLink) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'email_user',
                pass: 'email_pass'
            }
        });

        const mailOptions = {
            from: 'noreply@codelab.com',
            to: email,
            subject: 'Recuperação de senha',
            html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>O link expira em 1 hora.</p>`
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();