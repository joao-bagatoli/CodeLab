class ChallengeService {
    async getChallengesAsync() {
        const connection = await global.db.connectDbAsync();
        const query = `
            SELECT c.*, cat.category_name
            FROM challenges c
            INNER JOIN categories cat ON c.category_id = cat.category_id
        `;
        const [challenges] = await connection.query(query);
        return challenges;
    }

    async addChallengeAsync(challenge, user) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO challenges (challenge_title, challenge_description, challenge_difficulty, category_id, created_by, created_at) VALUES (?,?,?,?,?,NOW());";
        await connection.query(query, [challenge.title, challenge.description, challenge.difficulty, challenge.category, user.id]);
    }

    async updateChallengeAsync(challenge) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE challenges SET challenge_title = ?, challenge_description = ?, challenge_difficulty = ?, category_id = ? WHERE challenge_id = ?;";
        await connection.query(query, [challenge.title, challenge.description, challenge.difficulty, challenge.category, challenge.id]);
    }

    async deleteChallengeAsync(challengeId) {
        const connection = await global.db.connectDbAsync();
        const query = "DELETE FROM challenges WHERE challenge_id = ?;";
        await connection.query(query, [challengeId]);
    }

    async getChallengeDetailsAsync(challengeId) {
        const connection = await global.db.connectDbAsync();
        const query = `
            SELECT c.*, cat.category_name
            FROM challenges c
            INNER JOIN categories cat ON c.category_id = cat.category_id
            WHERE c.challenge_id = ?
        `;
        const [challengeDetails] = await connection.query(query, [challengeId]);
        return challengeDetails.length ? challengeDetails[0] : null;
    }

    async saveSubmissionAsync(challengeId, userId, code, score) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO submission (challenge_id, user_id, submission_code, submission_score, submited_at) VALUES (?,?,?,?,NOW());";
        await connection.query(query, [challengeId, userId, code, score]);
    }
}

module.exports = new ChallengeService();