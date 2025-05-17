class ChallengeService {
    async getChallengesAsync() {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * FROM challenges;";
        const [challenges] = await connection.query(query);
        return challenges;
    }

    async addChallengeAsync(challenge, user) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO challenges (challenge_title, challenge_description, challenge_difficulty, created_by, created_at) VALUES (?,?,?,?,NOW());";
        await connection.query(query, [challenge.title, challenge.description, challenge.difficulty, user.id]);
    }

    async updateChallengeAsync(challenge) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE challenges SET challenge_title = ?, challenge_description = ?, challenge_difficulty = ? where challenge_id = ?;";
        await connection.query(query, [challenge.title, challenge.description, challenge.difficulty, challenge.id]);
    }

    async deleteChallengeAsync(challengeId) {
        const connection = await global.db.connectDbAsync();
        const query = "DELETE FROM challenges WHERE challenge_id = ?;";
        await connection.query(query, [challengeId]);
    }
}

module.exports = new ChallengeService();