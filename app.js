var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

// custom files imports
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');

const connectDB = require('./config/db');

var app = express();
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// CONNECT DATABASE
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Defining Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);
// app.use('/', (req, res, next) => res.send('Hello world'));

// app.use(express.static(path.join(__dirname, 'client', 'build'))); might use this

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// scripts for development which requires nodemon and concurrently
// "scripts": {
//   "start": "nodemon ./bin/www",
//   "client": "npm start --prefix client",
//   "dev": "concurrently \"npm run start\" \"npm run client\"",
//   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
// },

// "scripts": {
//   "start": "nodemon ./bin/www",
//   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false  npm install --prefix client && npm run build --prefix client",
//   "client": "npm start --prefix client",
//   "dev": "concurrently \"npm run start\" \"npm run client\""
// },

// https://devcenter.heroku.com/articles/troubleshooting-node-deploys#common-issues
// This link here of common issues of heroku has missing dependencies and it helped
// fix the deployment error.

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

// MERN Dev Connector Cluster Connection User Details:

// Username: prasanna
// password:  h6yhJiw77FoYhAJG

// Side Note:
// The cyclic deployment require to add the NODE_ENV variable value to 'production'.
// This was the last error
