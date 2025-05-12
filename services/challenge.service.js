class ChallengeService {
    async getChallengesAsync() {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT challenge_title, challenge_description, challenge_difficulty FROM challenges;";
        const [challenges] = await connection.query(query);
        return challenges;
    }

    async addChallengeAsync(challenge, user) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO challenges (challenge_title, challenge_description, challenge_difficulty, created_by, created_at) VALUES (?,?,?,?,NOW());";
        await connection.query(query, [challenge.title, challenge.description, challenge.difficulty, user.id]);
    }
}

module.exports = new ChallengeService();