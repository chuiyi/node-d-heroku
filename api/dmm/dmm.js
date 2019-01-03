var dmmParser = require('../../model/dmm/dmm').dmmParser;

// api/dmm/query?q=
// api/dmm/video?cid=
// api/dmm/list?url=
// api/dmm/actress?id=

// 待實作
// api/dmm/top
// api/dmm/actress?name=

var query = function (req, res, next) {
    if (req.query) {
        var url_search;
        if (req.query.q) {
            url_search = dmmParser.parseUrlQuery(req.query.q);
        } else {
            res.send({
                error: 'must contain arg "?q="'
            });
            // var url_search = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=maker/id=40136/sort=date/';
            // http://www.dmm.co.jp/digital/videoa/-/actress/recommend/
            // http://www.dmm.co.jp/digital/videoa/-/actress/=/keyword=a/
        }
        dmmParser.parseList(url_search, function (videos) {
            res.send(videos);
            // console.log(videos);
            // var randVideo = videos[getRandomInt(1, videos.length) - 1];
            // dmmParser.parseVideo(randVideo.url, function(video) {
            //     console.log(video);
            // });
        });
    }
}

var queryFile = function (req, res, next) {
    if (req.query) {
        var url_search;
        if (req.query.q) {
            var parseFileName = req.query.q;
            url_search = dmmParser.parseVideoNumber(parseFileName);
        } else {
            url_search = dmmParser.parseUrlQuery('大橋未久');
        }
        dmmParser.parseList(url_search, function (videos) {
            res.send(videos);
        });
    }
}

var video = function (req, res, next) {
    if (req.query) {
        var url_video = 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=kawd030/';
        if (req.query.cid) {
            url_video = 'http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=' + req.query.cid + '/';
        }
        if (req.query.url) {
            url_video = req.query.url;
        }
        dmmParser.parseVideo(url_video, function (video) {
            res.send(video);
        });
        // dmmParser.parseList(url_search, function(videos) {
        //     res.send(videos);
        // console.log(videos);
        // var randVideo = videos[getRandomInt(1, videos.length) - 1];
        // dmmParser.parseVideo(randVideo.url, function(video) {
        //     console.log(video);
        // });
        // });
    }
}

var list = function (req, res, next) {
    if (req.query) {
        var url_list = 'http://www.dmm.co.jp/digital/videoa/-/list/=/sort=ranking/';
        if (req.query.url) {
            url_list = req.query.url;
        }
        dmmParser.parseList(url_list, function (videos) {
            res.send(videos);
        });
    }
}

var actress = function (req, res, next) {
    if (req.query) {
        var url_list = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=actress/id=1034355/';
        if (req.query.id) {
            url_list = 'http://www.dmm.co.jp/digital/videoa/-/list/=/article=actress/id=' + req.query.id + '/';
        }
        dmmParser.parseList(url_list, function (video) {
            res.send(video);
        });
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var dmm = {
    query,
    queryFile,
    video,
    list,
    actress
};

module.exports = dmm;