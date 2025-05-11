var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');

router.get('/', requireLogin, requireAdmin, function (req, res) {
    res.render('admin/dashboard', { user: req.session.user });
});

module.exports = router;