var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');
var controller = require('../../controllers/category.controller');

router.get('/', requireLogin, requireAdmin, controller.getCategories);

router.post('/', requireLogin, requireAdmin, controller.addCategory);

router.post('/:id/update', requireLogin, requireAdmin, controller.updateCategory);

router.post('/:id/delete', requireLogin, requireAdmin, controller.deleteCategory);

module.exports = router;