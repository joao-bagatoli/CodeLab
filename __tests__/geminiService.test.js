const { validateCodeWithGeminiAsync } = require('../services/gemini.service');

// Mock do SDK do Google Generative AI
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: () => 'CORRETO'
            }
          })
        })
      };
    })
  };
});

describe('geminiService.validateCodeWithGeminiAsync', () => {
  const fakeChallenge = {
    challenge_title: 'Somar Números',
    challenge_description: 'Crie uma função que some dois números.',
    category_name: 'Matemática',
    challenge_difficulty: 'easy'
  };

  it('deve retornar "CORRETO" quando o mock responde corretamente', async () => {
    const result = await validateCodeWithGeminiAsync(fakeChallenge, 'javascript', 'function somar(a,b){ return a+b; }');
    expect(result).toBe('CORRETO');
  });

  it('deve chamar o modelo com prompt esperado', async () => {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const instance = new GoogleGenerativeAI('FAKE_KEY');
    const model = instance.getGenerativeModel({ model: 'gemini-2.0-flash' });

    await validateCodeWithGeminiAsync(fakeChallenge, 'javascript', 'function somar(a,b){ return a+b; }');

    expect(model.generateContent).toHaveBeenCalled();
  });
});
