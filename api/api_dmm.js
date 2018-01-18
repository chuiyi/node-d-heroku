var express = require('express');
var router = express.Router();
// var session = require('express-session');
var dmm_parser = require('../model/parser_dmm.js');

// api/dmm/query?q=
// api/dmm/video?cid=
// api/dmm/list?url=
// api/dmm/actress?id=

// 待實作
// api/dmm/top
// api/dmm/actress?name=


router.all('/query', function(req, res) {
    if (req.query) {
        var url_search;
        if (req.query.q) {
            url_search = dmm_parser.parseQueryUrl(req.query.q);
        } else {
            res.send({
                error: 'must contain arg "?q="'
            });
            // var url_search = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=maker/id=40136/sort=date/';
            // http://www.dmm.co.jp/digital/videoa/-/actress/recommend/
            // http://www.dmm.co.jp/digital/videoa/-/actress/=/keyword=a/
        }
        dmm_parser.parseList(url_search, function(videos) {
            res.send(videos);
            // console.log(videos);
            // var randVideo = videos[getRandomInt(1, videos.length) - 1];
            // dmm_parser.parseVideo(randVideo.url, function(video) {
            //     console.log(video);
            // });
        });
    }
})

router.all('/queryFile', function(req, res) {
    if (req.query) {
        var url_search;
        if (req.query.q) {
            var parseFileName = req.query.q;
            url_search = dmm_parser.getNumberWithFileName(parseFileName);
        } else {
            url_search = dmm_parser.parseQueryUrl('大橋未久');
        }
        dmm_parser.parseList(url_search, function(videos) {
            res.send(videos);
        });
    }
})

router.all('/video', function(req, res) {
    if (req.query) {
        var url_video = 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=kawd030/';
        if (req.query.cid) {
            url_video = 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=' + req.query.cid + '/';
        }
        if (req.query.url) {
            url_video = req.query.url;
        }
        dmm_parser.parseVideo(url_video, function(video) {
            res.send(video);
        });
        // dmm_parser.parseList(url_search, function(videos) {
        //     res.send(videos);
        // console.log(videos);
        // var randVideo = videos[getRandomInt(1, videos.length) - 1];
        // dmm_parser.parseVideo(randVideo.url, function(video) {
        //     console.log(video);
        // });
        // });
    }
})

router.all('/list', function(req, res) {
    if (req.query) {
        var url_list = 'http://www.dmm.co.jp/digital/videoa/-/list/=/sort=ranking/';
        if (req.query.url) {
            url_list = req.query.url;
        }
        dmm_parser.parseList(url_list, function(videos) {
            res.send(videos);
        });
    }
})

router.all('/actress', function(req, res) {
    if (req.query) {
        var url_list = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=actress/id=1034355/';
        if (req.query.id) {
            url_list = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=actress/id=' + req.query.id + '/';
        }
        dmm_parser.parseList(url_list, function(video) {
            res.send(video);
        });
    }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;