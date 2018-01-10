var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Welcome to No Man\'s Land' });
// });

router.get('/404', function(req, res, next) {
    // res.render('index');
    // proxy.web(req, res, {//     target: 'http://127.0.0.1:1001/'
    // });
    res.status(404).render('http404');
});

module.exports = router;