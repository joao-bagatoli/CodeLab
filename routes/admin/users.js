var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');
var controller = require('../../controllers/user.controller');

router.get('/', requireLogin, requireAdmin, controller.getUsers);

router.post('/', requireLogin, requireAdmin, controller.addUser);

router.post('/:id/update', requireLogin, requireAdmin, controller.updateUser);

router.post('/:id/delete', requireLogin, requireAdmin, controller.deleteUser);

module.exports = router;