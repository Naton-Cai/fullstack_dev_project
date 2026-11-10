const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testinsertRouter = require('./routes/testinsert');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/vendor/bootstrap',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css'),
  ),
);
app.use(
  '/vendor/bootstrap/js',
  express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js'),
  ),
);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// temp insert to test connectivity to MongoDB, we should remove later
app.use('/testinsert', testinsertRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = req.app.get('env') === 'production' && (!err.status || err.status >= 500)
    ? 'Internal Server Error'
    : err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
