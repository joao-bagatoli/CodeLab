const challengeService = require('../services/challenge.service');

class ChallengeController {
    static async getChallenges(req, res) {
        try {
            const user = req.session.user;
            const challenges = await challengeService.getChallengesAsync();
            if (user.isAdmin) {
                return res.render('admin/challenges', { user, challenges });
            }
            return res.render('challenges', { user, challenges });
        } catch {
            return res.render('admin/challenges', { user, challenges: null });
        }
    }

    static async addChallenge(req, res) {
        try {
            const { title, description, difficulty } = req.body;

            const challenge = { title, description, difficulty };
            const user = req.session.user;

            await challengeService.addChallengeAsync(challenge, user);

            return res.redirect('/admin/challenges');
        } catch {
            return res.render('admin/challenges', { user, challenges: null });
        }
    }

    static async updateChallenge(req, res) {
        try {
            const { title, description, difficulty } = req.body;
            const id = req.params.id;
            const challenge = { id, title, description, difficulty };
            await challengeService.updateChallengeAsync(challenge);
            return res.redirect('/admin/challenges');
        } catch {
            const user = req.session.user;
            return res.render('admin/challenges', { user, challenges: null });
        }
    }

    static async deleteChallenge(req, res) {
        try {
            const id = req.params.id;
            await challengeService.deleteChallengeAsync(id);
            return res.redirect('/admin/challenges');
        } catch {
            const user = req.session.user;
            return res.render('admin/challenges', { user, challenges: null });
        }
    }
}

module.exports = ChallengeController;