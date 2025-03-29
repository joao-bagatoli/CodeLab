var express = require('express');
var router = express.Router();
const controller = require('../controllers/accountController');

router.post('/login', controller.login);
router.post('/create', controller.create);

module.exports = router;