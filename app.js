let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let connectdb = require('./database/connection');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let authRouter = require('./routes/auth');
let consumptionListRouter = require('./routes/consumption');
let profileRouter = require('./routes/profile');

require("dotenv").config();

let app = express();
const PORT = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// port and DB config
const DATABASE_CONNECTION = process.env.DATABASE_URL;
const DATABASE_PORT = process.env.DATABASE_PORT || 5000;

// mongoose connection
connectdb(DATABASE_CONNECTION, DATABASE_PORT);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/consumption', consumptionListRouter);
app.use('/profile', profileRouter);

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

app.listen(PORT, (req, res) => {
  console.log(`listening at port ${PORT}`);
});

module.exports = app;
