var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var challengesRouter = require('./routes/challenges');
var myChallengesRouter = require('./routes/myChallenges');
var rankingRouter = require('./routes/ranking');

var adminDashboardRouter = require('./routes/admin/dashboard');
var adminUsersRouter = require('./routes/admin/users');
var adminChallengesRouter = require('./routes/admin/challenges');
var adminCategoriesRouter = require('./routes/admin/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'chave-secreta-super-segura',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true if it's using https
}));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

app.use('/', indexRouter);
app.use('/challenges', challengesRouter);
app.use('/my-challenges', myChallengesRouter);
app.use('/ranking', rankingRouter);

app.use('/admin/dashboard', adminDashboardRouter);
app.use('/admin/users', adminUsersRouter);
app.use('/admin/challenges', adminChallengesRouter);
app.use('/admin/categories', adminCategoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
