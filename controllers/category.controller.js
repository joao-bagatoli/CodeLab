const categoryService = require('../services/category.service');

class CategoryController {
    static async getCategories(req, res) {
        const user = req.session.user;

        try {
            const categories = await categoryService.getCategoriesAsync();
            return res.render('admin/categories', { user, categories, error: null });
        } catch {
            return res.render('admin/categories', { user, categories: [], error: 'Erro ao carregar categorias' });
        }
    }

    static async addCategory(req, res) {
        const user = req.session.user;

        try {
            const { name, description } = req.body;
            const category = { name, description };
            await categoryService.addCategoryAsync(category);
            return res.redirect('/admin/categories');
        } catch {
            return res.render('admin/categories', { user, categories: [], error: 'Erro ao adicionar categoria' });
        }
    }

    static async updateCategory(req, res) {
        const user = req.session.user;

        try {
            const { name, description } = req.body;
            const id = req.params.id;
            const category = { id, name, description };
            await categoryService.updateCategoryAsync(category);
            return res.redirect('/admin/categories');
        } catch {
            return res.render('admin/categories', { user, categories: [], error: 'Erro ao atualizar categoria' });
        }
    }

    static async deleteCategory(req, res) {
        const user = req.session.user;

        try {
            const id = req.params.id;
            await categoryService.deleteCategoryAsync(id);
            return res.redirect('/admin/categories');
        } catch {
            return res.render('admin/categories', { user, categories: [], error: 'Erro ao deletar categoria' });
        }
    }
}

module.exports = CategoryController;