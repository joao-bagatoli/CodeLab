var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');

router.get('/', requireLogin, requireAdmin, function (req, res) {
    res.render('admin/categories', { user: req.session.user });
});

module.exports = router;