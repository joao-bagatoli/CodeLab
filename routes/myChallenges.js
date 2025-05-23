var express = require('express');
var router = express.Router();
var requireLogin = require('../middlewares/requireLogin');

router.get('/', requireLogin, function (req, res) {
    res.render('myChallenges', { user: req.session.user });
});

module.exports = router;