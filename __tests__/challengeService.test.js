const ChallengeService = require('../services/challenge.service');
const mockConnection = { query: jest.fn() };

global.db = {
  connectDbAsync: jest.fn().mockResolvedValue(mockConnection)
};

describe('ChallengeService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getChallengesAsync deve retornar lista de desafios', async () => {
    const challenges = [{ id: 1, title: 'Desafio 1' }];
    mockConnection.query.mockResolvedValue([challenges]);

    const result = await ChallengeService.getChallengesAsync();
    expect(result).toEqual(challenges);
    expect(mockConnection.query).toHaveBeenCalledWith("SELECT * FROM challenges;");
  });

  test('addChallengeAsync deve adicionar um desafio', async () => {
    const challenge = { title: 'Título', description: 'Desc', difficulty: 'Médio' };
    const user = { id: 1 };

    await ChallengeService.addChallengeAsync(challenge, user);
    expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO challenges'), [
      challenge.title, challenge.description, challenge.difficulty, user.id
    ]);
  });

  test('updateChallengeAsync deve atualizar um desafio', async () => {
    const challenge = { id: 1, title: 'Novo', description: 'Atualizado', difficulty: 'Alta' };

    await ChallengeService.updateChallengeAsync(challenge);
    expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE challenges'), [
      challenge.title, challenge.description, challenge.difficulty, challenge.id
    ]);
  });

  test('deleteChallengeAsync deve deletar um desafio', async () => {
    await ChallengeService.deleteChallengeAsync(10);
    expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM challenges'), [10]);
  });
});
