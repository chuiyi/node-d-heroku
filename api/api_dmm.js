var express = require('express');
var router = express.Router();
// var session = require('express-session');
var dmm_parser = require('../model/parser_dmm.js');

router.all('/query', function(req, res) {
    if (req.query) {
        var url_search;
        if (req.query.q) {
            url_search = dmm_parser.parseQueryUrl(req.query.q);
        } else {
            url_search = dmm_parser.parseQueryUrl('大橋未久');
            // url_search = dmm_parser.parseQueryUrl('金城アンナ');
            // var url_search = dmm_parser.parseQueryUrl('木下柚花');
            // var url_search = dmm_parser.parseQueryUrl('早乙女ルイ');
            // var url_search = dmm_parser.parseQueryUrl('神谷姫');
            // var url_search = dmm_parser.parseQueryUrl('麻里梨夏');
            // var url_search = dmm_parser.parseQueryUrl('柚月あい');
            // var url_search = dmm_parser.parseQueryUrl('abp 141');
            // var url_search = dmm_parser.parseQueryUrl('Tokyo 流儀');
            // var url_search = dmm_parser.parseQueryUrl('最初で最後の姉妹共演');
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
});

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;