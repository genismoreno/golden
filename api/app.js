var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var historyRouter = require('./routes/history');
var nlpRouter = require('./routes/nlp');
var processRouter = require('./routes/process');

var app = express();

//setup db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/golden', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/history', historyRouter);
app.use('/nlp', nlpRouter);
app.use('/process', processRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000';
var host = process.env.HOST || 'localhost';

http
  .createServer(app)
  .listen(port, host, err => {
    console.log(`Listening for Requests on: ${host}:${port}`);
  })
  .on('error', error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  });


module.exports = app;
