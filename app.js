var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

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

// line bot start
const line_config = {
    channelAccessToken: 'SzwQw+G1cSQMyNjLOmDv4Z31S4ggaHjATQJgfHIIaZjr7yb3nZ2k1HC1MPqQVYjkvNqkWP1DIfChR3uT2n70kpKusNqSzAPnw4WkMdrJPpafRb8dzt7bqnfOoRfPmfKqjIlNtZyI3GILUgnB9f+zOAdB04t89/1O/w1cDnyilFU=',
    channelSecret: '3d9689b03d5cee7f534a89ff9ce0b211'
};

const line_client = new line.Client(line_config);
app.post('/linebot/callback', line.middleware(line_config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return line_client.replyMessage(event.replyToken, echo);
}
// line bot end

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