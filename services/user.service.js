class UserService {
    async getUsersAsync() {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT user_id, user_name, user_email, user_admin FROM users;";
        const [users] = await connection.query(query);
        return users;
    }

    async addUserAsync(user) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO users (user_name, user_email, user_admin) VALUES (?,?,?);";
        await connection.query(query, [user.name, user.email, user.isAdmin]);
    }

    async updateUserAsync(userId, isAdmin) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE users SET user_admin = ? WHERE user_id = ?;";
        await connection.query(query, [isAdmin, userId]);
    }

    async deleteUserAsync(userId) {
        const connection = await global.db.connectDbAsync();
        const query = "DELETE FROM users WHERE user_id = ?;";
        await connection.query(query, [userId]);
    }
}

module.exports = new UserService();