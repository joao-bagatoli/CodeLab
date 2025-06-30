jest.mock('nodemailer');

const nodemailer = require('nodemailer');
const emailService = require('../utils/emailService');

describe('EmailService', () => {
  it('deve enviar e-mail de recuperação corretamente', async () => {
    const mockSendMail = jest.fn().mockResolvedValue('Email enviado');
    
    nodemailer.createTransport.mockReturnValue({
      sendMail: mockSendMail
    });

    const email = 'teste@exemplo.com';
    const resetLink = 'http://localhost/reset/123';

    await emailService.sendResetEmailAsync(email, resetLink);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: 'email_user',
        pass: 'email_pass'
      }
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'noreply@codelab.com',
      to: email,
      subject: 'Recuperação de senha',
      html: expect.stringContaining(resetLink)
    });
  });
});
