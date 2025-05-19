class CategoryService {
    async getCategoriesAsync() {
        const connection = await global.db.connectDbAsync();
        const query = "SELECT * FROM categories";
        const [categories] = await connection.query(query);
        return categories;
    }

    async addCategoryAsync(category) {
        const connection = await global.db.connectDbAsync();
        const query = "INSERT INTO categories (category_name, category_description) VALUES (?,?);";
        await connection.query(query, [category.name, category.description]);
    }

    async updateCategoryAsync(category) {
        const connection = await global.db.connectDbAsync();
        const query = "UPDATE categories SET category_name = ?, category_description = ? WHERE category_id = ?;";
        await connection.query(query, [category.name, category.description, category.id]);
    }

    async deleteCategoryAsync(id) {
        const connection = await global.db.connectDbAsync();
        const query = "DELETE FROM categories WHERE category_id = ?;";
        await connection.query(query, [id]);
    }
}

module.exports = new CategoryService();