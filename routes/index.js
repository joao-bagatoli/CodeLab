var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/signUp', function(req, res) {
  res.render('signUp');
});

router.get('/home', function(req, res) {
  res.render('home');
});

module.exports = router;
