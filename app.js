const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./config/passport');

const auth = require('./middlewares/auth');
//const mongoose = require('mongoose');

const db = require('./database/db');
db.connectToDatabase(process.env.DB_URL);
/* mongoose
  .connect("mongodb+srv://admin:Monday2020@cluster0.8u0dm.mongodb.net/practice?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err)); */

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');

//const db = require('./database/db');
//db.connectToDatabase("mongodb+srv://admin:Heena@11@cluster0.8u0dm.mongodb.net/nagp?retryWrites=true&w=majority");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', auth.isAuthenticated(), coursesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;