var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api_dmm = require('./api/api_dmm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);	
app.use('/api/dmm', api_dmm);

var contentDisposition = require('content-disposition');
var scan = require('./scan');
var tree = scan('.', 'files');
console.log(tree);
app.use('/', express.static(path.join(__dirname, 'frontend')));
app.use('/files', express.static(process.cwd(), {
    index: false,
    setHeaders: function(res, path) {
        // Set header to force files to download
        res.setHeader('Content-Disposition', contentDisposition(path))
    }
}));
app.get('/scan', function(req, res) {
    res.send(tree);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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