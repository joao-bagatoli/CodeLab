const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('Define the environment variable GEMINI_API_KEY');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function validateCodeWithGeminiAsync(challengeDetails, language, code) {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
        Você é um avaliador de código para uma plataforma de desafios de programação.
        O desafio é:
        Título: ${challengeDetails.challenge_title},
        Descrição: ${challengeDetails.challenge_description},
        Categoria: ${challengeDetails.category_name},
        Dificuldade: ${challengeDetails.challenge_difficulty},

        O usuário enviou o seguinte código para resolver o desafio, na linguagem ${language}:
        \`\`\`
        ${code}
        \`\`\`

        Por favor, avalie o código do usuário. Considere se ele atende a descrição do desafio,
        se possui erros lógicos ou de sintaxe (se visíveis sem execução), e se é uma solução eficiente ou correta.
        Me diga apenas "CORRETO" se a solução estiver completamente correta e completa, ou "INCORRETO" seguido de
        uma breve explicação do motivo e sugestões de melhoria se estiver incorreta.
        Exemplo de resposta correta: "CORRETO".
        Exemplo de resposta incorreta: "INCORRETO: O código não trata casos de entrada vazia. Considere adicionar uma verificação de null/undefined."
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
    } catch(error) {
        console.error('Error trying to connect with Gemini API', error);
    }
}

module.exports = { validateCodeWithGeminiAsync };