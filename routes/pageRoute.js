var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Welcome to No Man\'s Land'
    });
});

router.get('/dmm/query', function (req, res, next) {
    res.render('dmmQuery', {
        title: 'Welcome to No Man\'s Land'
    });
});

// router.get('/404', function(req, res, next) {
//     // res.render('index');
//     // proxy.web(req, res, {//     target: 'http://127.0.0.1:1001/'
//     // });
//     res.status(404).render('index', {
//         title: '測試一下'
//     });
// });

module.exports = router;