const challengeService = require('../services/challenge.service');

class ChallengeController {
    static async getChallenges(req, res) {
        try {
            const user = req.session.user;
            const challenges = await challengeService.getChallengesAsync();
            return res.render('admin/challenges', { user, challenges });
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
}

module.exports = ChallengeController;