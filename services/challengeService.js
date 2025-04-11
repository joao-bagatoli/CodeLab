class ChallengeService {
    async listAllAsync() {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * FROM challenges";
        const [rows] = await connection.query(query); 
        return rows.length ? rows[0] : null;
    }
}

module.exports = new ChallengeService();