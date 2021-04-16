const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

let indexRouter = require('./Routes/index');

let app = express();

let DBConfig = require('./Config/db');
mongoose.connect(DBConfig.Path, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //console.log(`Connected to MongoDB at: ${DBConfig.Path}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);

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
  res.render('error', { message: err.message, error: res.locals.error, title: 'ERROR', page: 'error'});
});

module.exports = app;
