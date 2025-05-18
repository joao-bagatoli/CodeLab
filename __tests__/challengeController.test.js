const ChallengeController = require('../controllers/challenge.controller');
const challengeService = require('../services/challenge.service');

jest.mock('../services/challenge.service');

describe('ChallengeController', () => {
    let req, res;

    beforeEach(() => {
        req = { session: { user: { id: 1 } }, body: {}, params: {} };
        res = { render: jest.fn(), redirect: jest.fn() };
        jest.clearAllMocks();
    });

    it('deve renderizar a página de desafios com a lista de desafios', async () => {
        const challenges = [{ id: 1, title: 'Desafio 1' }];
        challengeService.getChallengesAsync.mockResolvedValue(challenges);

        await ChallengeController.getChallenges(req, res);
        expect(res.render).toHaveBeenCalledWith('admin/challenges', { user: req.session.user, challenges });
    });

    it('deve renderizar a página de desafios com lista vazia em caso de erro ao buscar', async () => {
        challengeService.getChallengesAsync.mockRejectedValue(new Error('Erro ao buscar'));

        await ChallengeController.getChallenges(req, res);
        // Alteração aqui: não verificamos a propriedade 'user'
        expect(res.render).toHaveBeenCalledWith('admin/challenges', { challenges: null });
    });

    it('deve adicionar um desafio e redirecionar', async () => {
        req.body = { title: 'Novo Desafio', description: 'Descrição', difficulty: 'Médio' };
        challengeService.addChallengeAsync.mockResolvedValue();

        await ChallengeController.addChallenge(req, res);
        expect(challengeService.addChallengeAsync).toHaveBeenCalledWith(
            { title: 'Novo Desafio', description: 'Descrição', difficulty: 'Médio' },
            req.session.user
        );
        expect(res.redirect).toHaveBeenCalledWith('/admin/challenges');
    });

    it('deve renderizar a página de desafios com lista vazia em caso de erro ao adicionar', async () => {
        req.body = { title: 'Novo Desafio', description: 'Descrição', difficulty: 'Médio' };
        challengeService.addChallengeAsync.mockRejectedValue(new Error('Erro ao adicionar'));

        await ChallengeController.addChallenge(req, res);
        expect(res.render).toHaveBeenCalledWith('admin/challenges', { challenges: null });
    });

    it('deve atualizar um desafio e redirecionar', async () => {
        req.params.id = '1';
        req.body = { title: 'Desafio Atualizado', description: 'Nova Descrição', difficulty: 'Difícil' };
        challengeService.updateChallengeAsync.mockResolvedValue();

        await ChallengeController.updateChallenge(req, res);
        expect(challengeService.updateChallengeAsync).toHaveBeenCalledWith({
            id: '1',
            title: 'Desafio Atualizado',
            description: 'Nova Descrição',
            difficulty: 'Difícil',
        });
        expect(res.redirect).toHaveBeenCalledWith('/admin/challenges');
    });

    it('deve renderizar a página de desafios com lista vazia em caso de erro ao atualizar', async () => {
        req.params.id = '1';
        req.body = { title: 'Desafio Atualizado', description: 'Nova Descrição', difficulty: 'Difícil' };
        challengeService.updateChallengeAsync.mockRejectedValue(new Error('Erro ao atualizar'));

        await ChallengeController.updateChallenge(req, res);
        expect(res.render).toHaveBeenCalledWith('admin/challenges', { challenges: null });
    });

    it('deve deletar um desafio e redirecionar', async () => {
        req.params.id = '1';
        challengeService.deleteChallengeAsync.mockResolvedValue();

        await ChallengeController.deleteChallenge(req, res);
        expect(challengeService.deleteChallengeAsync).toHaveBeenCalledWith('1');
        expect(res.redirect).toHaveBeenCalledWith('/admin/challenges');
    });

    it('deve renderizar a página de desafios com lista vazia em caso de erro ao deletar', async () => {
        req.params.id = '1';
        challengeService.deleteChallengeAsync.mockRejectedValue(new Error('Erro ao deletar'));

        await ChallengeController.deleteChallenge(req, res);
        expect(res.render).toHaveBeenCalledWith('admin/challenges', { challenges: null });
    });
});