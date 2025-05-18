const { generateResetToken } = require('../utils/tokenUtil');

describe('tokenUtil', () => {
    it('deve gerar um token de reset de senha', () => {
        const token = generateResetToken();
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(0);
    });
});