var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');

router.get('/', function(req, res) {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/challenges');
    }
  }

  res.render('index', { error: null });
});

router.post('/login', mainController.login);

router.get('/sign-up', function(req, res) {
  res.render('signUp', { error: null });
});

router.post('/sign-up', mainController.signUp);

router.get('/forgot-password', function(req, res) {
  res.render('forgotPassword', { error: null, success: null });
});

router.post('/forgot-password', mainController.forgotPassword);

router.get('/reset-password', function(req, res) {
  res.render('resetPassword', { error: null });
});

router.post('/reset-password', mainController.resetPassword);

router.get('/password-reset-success', function(req, res) {
  res.render('passwordResetSuccess');
});

router.get('/logout', mainController.logout);

module.exports = router;
