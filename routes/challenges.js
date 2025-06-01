var express = require('express');
var router = express.Router();
var requireLogin = require('../middlewares/requireLogin');
var controller = require('../controllers/challenge.controller');

router.get('/', requireLogin, controller.getChallenges);

router.get('/:id', requireLogin, controller.getChallengeDetails);

module.exports = router;