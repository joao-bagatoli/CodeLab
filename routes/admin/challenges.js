var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');
var controller = require('../../controllers/challenge.controller');

router.get('/', requireLogin, requireAdmin, controller.getChallenges);

router.post('/', requireLogin, requireAdmin, controller.addChallenge);

module.exports = router;