class AccountService {
    async loginAsync(email, password) {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
        const [rows] = await connection.query(query, [email, password]);
        return rows.length ? rows[0] : null;
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
        const [rows] = await connection.query(query, [email]);
        return rows.length ? rows[0] : null;
    }

    async savePasswordResetTokenAsync(userId, token, expiration) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE user_id = ?";
        await connection.query(query, [token, expiration, userId]);
    }

    async getUserByTokenAsync(token) {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT user_id, reset_token_expiration FROM users WHERE reset_token = ?";
        const [rows] = await connection.query(query, [token]);
        return rows.length ? rows[0] : null;
    }

    async updatePasswordAsync(userId, newPassword) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE users SET user_password = ? WHERE user_id = ?";
        await connection.query(query, [newPassword, userId]);
    }

    async invalidateTokenAsync(userId) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE users SET reset_token = NULL, reset_token_expiration = NULL WHERE user_id = ?";
        await connection.query(query, [userId]);
    }
}

module.exports = new AccountService();