const challengeService = require('../services/challenge.service');
const categoryService = require('../services/category.service');
const geminiService = require('../services/gemini.service');

class ChallengeController {
    static async getChallenges(req, res) {
        const user = req.session.user;

        try {
            const challenges = await challengeService.getChallengesAsync();
            if (user.isAdmin) {
                const categories = await categoryService.getCategoriesAsync();
                return res.render('admin/challenges', { user, challenges, categories, error: null });
            }
            return res.render('challenges', { user, challenges });
        } catch {
            if (user.isAdmin) {
                return res.render('admin/challenges', { user, challenges: [], categories: [], error: 'Erro ao carregar desafios' });
            }
            return res.render('challenges', { user, challenges: null });
        }
    }

    static async addChallenge(req, res) {
        const user = req.session.user;

        try {
            const { title, description, difficulty, category } = req.body;
            const challenge = { title, description, difficulty, category };
            await challengeService.addChallengeAsync(challenge, user);
            return res.redirect('/admin/challenges');
        } catch {
            return res.render('admin/challenges', { user, challenges: [], categories: [], error: 'Erro ao adicionar desafio' });
        }
    }

    static async updateChallenge(req, res) {
        const user = req.session.user;

        try {
            const { title, description, difficulty, category } = req.body;
            const id = req.params.id;
            const challenge = { id, title, description, difficulty, category };
            await challengeService.updateChallengeAsync(challenge);
            return res.redirect('/admin/challenges');
        } catch {
            return res.render('admin/challenges', { user, challenges: [], categories: [], error: 'Erro ao atualizar desafio' });
        }
    }

    static async deleteChallenge(req, res) {
        const user = req.session.user;

        try {
            const id = req.params.id;
            await challengeService.deleteChallengeAsync(id);
            return res.redirect('/admin/challenges');
        } catch {
            return res.render('admin/challenges', { user, challenges: [], categories: [], error: 'Erro ao deletar desafio' });
        }
    }

    static async getChallengeDetails(req, res) {
        const user = req.session.user;

        try {
            const id = req.params.id;
            const challengeDetails = await challengeService.getChallengeDetailsAsync(id);
            const initialCode = 'function() {\n // seu código aqui \n}';
            return res.render('challengeDetails', { user, challengeDetails, initialCode, error: null, submitResult: null });
        } catch {
            return res.render('challengeDetails', { 
                user, 
                challengeDetails: [], 
                initialCode: null, 
                error: 'Erro ao carregar detalhes do desafio', 
                submitResult: null 
            });
        }
    }

    static async submitChallenge(req, res) {
        const user = req.session.user;
        const challengeId = req.params.id;
        const { language, code } = req.body;

        try {
            const challengeDetails = await challengeService.getChallengeDetailsAsync(challengeId);
            const evaluationResult = await geminiService.validateCodeWithGeminiAsync(challengeDetails, language, code);

            if (evaluationResult.startsWith('CORRETO')) {
                let score = 0;
                if (challengeDetails.challenge_difficulty == 'easy') {
                    score = 10;
                } else if (challengeDetails.challenge_difficulty == 'medium') {
                    score = 20;
                } else if (challengeDetails.challenge_difficulty == 'hard') {
                    score = 30;
                } else {
                    throw new Error('Invalid challenge difficulty');
                }
                
                await challengeService.saveSubmissionAsync(challengeDetails.challenge_id, user.id, code, score);
                return res.render('challengeDetails', { 
                    user, 
                    challengeDetails, 
                    initialCode: code, 
                    error: null, 
                    submitResult: { isCorrect: true, message: 'Parabéns! Seu código está correto' } 
                });
            }

            return res.render('challengeDetails', { 
                user, 
                challengeDetails, 
                initialCode: code, 
                error: null, 
                submitResult: { isCorrect: false, message: evaluationResult.replace('INCORRETO: ', '') } 
            });
        } catch {
            return res.render('challengeDetails', { 
                user, 
                challengeDetails: [], 
                initialCode: code, 
                error: 'Erro ao solucionar desafio', 
                submitResult: null 
            });
        }
    }
}

module.exports = ChallengeController;