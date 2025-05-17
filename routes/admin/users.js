var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');
var controller = require('../../controllers/user.controller');

router.get('/', requireLogin, requireAdmin, controller.getUsers);

router.post('/', requireLogin, requireAdmin, controller.addUser);

module.exports = router;