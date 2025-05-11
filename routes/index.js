var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/login', mainController.login);

router.get('/sign-up', function(req, res) {
  res.render('signUp');
});

router.post('/sign-up', mainController.signUp);

router.get('/forgot-password', function(req, res) {
  res.render('forgotPassword');
});

router.post('/forgot-password', mainController.forgotPassword);

router.get('/reset-password', function(req, res) {
  res.render('resetPassword');
});

router.post('/reset-password', mainController.resetPassword);

router.get('/password-reset-success', function(req, res) {
  res.render('passwordResetSuccess');
});

module.exports = router;
