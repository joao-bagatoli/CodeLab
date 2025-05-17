var express = require('express');
var router = express.Router();
var requireLogin = require('../../middlewares/requireLogin');
var requireAdmin = require('../../middlewares/requireAdmin');
var controller = require('../../controllers/challenge.controller');

router.get('/', requireLogin, requireAdmin, controller.getChallenges);

router.post('/', requireLogin, requireAdmin, controller.addChallenge);

router.post('/:id/update', requireLogin, requireAdmin, controller.updateChallenge);

router.post('/:id/delete', requireLogin, requireAdmin, controller.deleteChallenge);

module.exports = router;