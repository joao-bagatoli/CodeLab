const challengeService = require('../services/challengeService');
const statusCodes = require('../utils/statusCodes');

class ChallengeController {
    static async listAll(req, res) {
        try {
            const challenges = await challengeService.listAllAsync();
        } catch {
            return res.status(statusCodes.INTERNAL_SEVER_ERROR).json({ message: 'Erro ao listar desafios' });
        }
    }
}

module.exports = ChallengeController;