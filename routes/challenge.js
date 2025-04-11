var express = require('express');
var router = express.Router();
const controller = require('../controllers/challengeController');

router.get('/list', controller.listAll);

module.exports = router;