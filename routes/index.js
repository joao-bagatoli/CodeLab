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

router.get('/home', function(req, res) {
  res.render('home');
});

module.exports = router;
