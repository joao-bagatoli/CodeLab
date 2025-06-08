const challengeService = require('../services/challenge.service');
const categoryService = require('../services/category.service');

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
            return res.render('challengeDetails', { user, challengeDetails, initialCode, error: null });
        } catch {
            return res.render('challengeDetails', { user, challengeDetails: [], initialCode: null, error: 'Erro ao carregar detalhes do desafio' });
        }
    }
}

module.exports = ChallengeController;