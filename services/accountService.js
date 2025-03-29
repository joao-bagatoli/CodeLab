class AccountService {
    async loginAsync(email, password) {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
        const [rows] = await connection.query(query, [email, password]);
        if (!rows) return null;
        return rows[0];
    }

    async createAsync(name, email, password) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)";
        const [result] = await connection.query(query, [name, email, password]);
        return result;
    }

    async getUserByEmailAsync(email) {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * from users WHERE user_email = ?";
        const [row] = await connection.query(query, [email]);
        return row[0];
    }

    async savePasswordResetTokenAsync(userId, token, expiration) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE user_id = ?";
        await connection.query(query, [token, expiration, userId]);
    }
}

module.exports = new AccountService();