var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/sign-up', function(req, res) {
  res.render('signUp');
});

router.get('/forgot-password', function(req, res) {
  res.render('forgotPassword');
});

router.get('/reset-password', function(req, res) {
  res.render('resetPassword');
});

router.get('/password-reset-success', function(req, res) {
  res.render('passwordResetSuccess');
});

router.get('/home', function(req, res) {
  res.render('home');
});

module.exports = router;
