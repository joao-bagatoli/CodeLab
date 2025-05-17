class UserService {
    async getUsersAsync() {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT user_name, user_email, user_admin FROM users;";
        const [users] = await connection.query(query);
        return users;
    }

    async addUserAsync(user) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO users (user_name, user_email, user_admin) VALUES (?,?,?);";
        await connection.query(query, [user.name, user.email, user.isAdmin]);
    }
}

module.exports = new UserService();