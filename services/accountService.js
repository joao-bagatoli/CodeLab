class AccountService {
    async loginAsync(email, password) {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
        const [rows] = await connection.query(query, [email, password]);
        if (!rows) return null;
        return rows[0];
    }
}

module.exports = new AccountService();