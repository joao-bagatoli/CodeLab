const categoryService = require('../services/category.service');

class CategoryController {
    static async getCategories(req, res) {
        try {
            const user = req.session.user;
            const categories = await categoryService.getCategoriesAsync();
            return res.render('admin/categories', { user, categories });
        } catch {
            return res.render('admin/categories', { user, categories: null });
        }
    }

    static async addCategory(req, res) {
        try {
            const { name, description } = req.body;
            const category = { name, description };
            await categoryService.addCategoryAsync(category);
            return res.redirect('/admin/categories');
        } catch {
            const user = req.session.user;
            return res.render('admin/categories', { user, categories: null });
        }
    }

    static async updateCategory(req, res) {
        try {
            const { name, description } = req.body;
            const id = req.params.id;
            const category = { id, name, description };
            await categoryService.updateCategoryAsync(category);
            return res.redirect('/admin/categories');
        } catch {
            const user = req.session.user;
            return res.render('admin/categories', { user, categories: null });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const id = req.params.id;
            await categoryService.deleteCategoryAsync(id);
            return res.redirect('/admin/categories');
        } catch {
            const user = req.session.user;
            return res.render('admin/categories', { user, categories: null });
        }
    }
}

module.exports = CategoryController;