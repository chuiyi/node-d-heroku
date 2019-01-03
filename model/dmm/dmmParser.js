var request = require('request');
var cheerio = require('cheerio');
var urlVideoPrefix = 'http://localhost:3000/api/dmm/video?cid=';
var urlActressPrefix = 'http://localhost:3000/api/dmm/actress?id=';

var parseList = function (url, callback, videos_var) {
    request({
        url: url,
        method: "GET"
    }, function (e, r, b) {
        if (!e) {
            $ = cheerio.load(b);
            // var videos = new Array($('ul#list.li'));
            var videos = videos_var ? videos_var : [];
            $('ul#list').find('li').each(function (i, elem) {
                var obj = new Object();
                obj.title = $(this).find('span.img img').attr('alt');
                obj.url = $(this).find('p.tmb a').attr('href').split("?").shift();
                obj.cid = obj.url.split("/cid=")[1].split("/")[0];
                obj.url_api = urlVideoPrefix + obj.cid;
                obj.img_cover = '';
                obj.img_thumbnail = $(this).find('p.tmb img').attr('src');
                if (obj.img_thumbnail.indexOf('http:') < 0)
                    obj.img_thumbnail = 'http:' + obj.img_thumbnail;
                obj.img_cover = obj.img_thumbnail.replace('pt.jpg', 'pl.jpg');
                videos.push(obj);
            });
            var url_next = '';
            $('div.list-boxcaptside').find('li').each(function (i, elem) {
                if ($(elem).text().indexOf('次へ') >= 0) {
                    url_next = 'http://www.dmm.co.jp' + $(elem).find('a').attr('href');
                }
            });
            if (url_next == '') {
                if (callback)
                    callback(videos);
            } else {
                parseList(url_next, callback, videos);
            }
        }
    });
}

var parseVideo = function (url, callback) {
    request({
        url: url,
        method: "GET"
    }, function (e, r, b) {
        if (!e) {
            $ = cheerio.load(b);

            var video = new Object();
            video.link = url;
            video.title = $('h1#title').text();
            video.cid = video.link.split("cid=")[1].split("/")[0];
            $('div#sample-video').find('a').each(function (i, e) {
                if (i == 0) {
                    video.img_cover = $(e).attr('href');
                }
            });
            $('div#sample-video').find('img').each(function (i, e) {
                if (i == 0) {
                    video.img_thumbnail = $(e).attr('src');
                }
            });
            var number = video.cid.match(/[a-zA-Z]+|[0-9]+/g);
            video.number = number[number.length - 2] + '-' + parseVideoNumberDigits(parseInt(number[number.length - 1]), 3);
            video.number = video.number.toUpperCase();
            video.description = $('div.mg-b20.lh4')[0].children[0].data.replace(/\n/g, '');

            var info = $('table.mg-b20');
            info.find('tr').each(function (i, elem) {
                if ($(this).text().includes('配信開始日')) {
                    $(this).find('td').each(function (i_s, elem_s) {
                        if (i_s == 1) {
                            video.date_online = $(elem_s).text().replaceAll('\n', '');
                        }
                    });
                }
                if ($(this).text().includes('商品発売日')) {
                    $(this).find('td').each(function (i_s, elem_s) {
                        if (i_s == 1) {
                            video.date_sale = $(elem_s).text().replaceAll('\n', '');
                        }
                    });
                }
                if ($(this).text().includes('収録時間')) {
                    $(this).find('td').each(function (i_s, elem_s) {
                        if (i_s == 1) {
                            video.time = $(elem_s).text().replaceAll('\n', '');
                        }
                    });
                }
                if ($(this).text().includes('出演者')) {
                    video.actresses = [];
                    video.actresses_collection = false;
                    $(this).find('span a').each(function (i_s, elem_s) {
                        if ($(elem_s).text().indexOf('すべて表示する') < 0) {
                            var actress = new Object();
                            actress.name = $(elem_s).text();
                            actress.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
                            actress.id = actress.link.split("/id=")[1].split("/")[0];
                            actress.api_url = urlActressPrefix + actress.id;
                            video.actresses.push(actress);
                        } else {
                            video.actresses_collection = true;
                        }
                    });
                }
                if ($(this).text().includes('監督')) {
                    video.directors = [];
                    $(this).find('a').each(function (i_s, elem_s) {
                        var director = new Object();
                        director.name = $(elem_s).text();
                        director.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
                        director.id = director.link.split("/id=")[1].split("/")[0];
                        video.directors.push(director);
                    });
                }
                if ($(this).text().includes('シリーズ')) {
                    video.series = [];
                    $(this).find('a').each(function (i_s, elem_s) {
                        var series = new Object();
                        series.name = $(elem_s).text();
                        series.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
                        series.id = series.link.split("/id=")[1].split("/")[0];
                        video.series.push(series);
                    });
                }
                if ($(this).text().includes('メーカー')) {
                    video.makers = [];
                    $(this).find('a').each(function (i_s, elem_s) {
                        var maker = new Object();
                        maker.name = $(elem_s).text();
                        maker.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
                        maker.id = maker.link.split("/id=")[1].split("/")[0];
                        video.makers.push(maker);
                    });
                }
                if ($(this).text().includes('レーベル')) {
                    video.labels = [];
                    $(this).find('a').each(function (i_s, elem_s) {
                        var label = new Object();
                        label.name = $(elem_s).text();
                        label.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
                        label.id = label.link.split("/id=")[1].split("/")[0];
                        video.labels.push(label);
                    });
                }
                if ($(this).text().includes('ジャンル')) {
                    video.keywords = [];
                    $(this).find('a').each(function (i_s, elem_s) {
                        var keyword = new Object();
                        keyword.name = $(elem_s).text();
                        keyword.link = 'http://www.dmm.co.jp' + $(elem_s).attr('href');
                        keyword.id = keyword.link.split("/id=")[1].split("/")[0];
                        video.keywords.push(keyword);
                    });
                }
                // if ($(this).text().includes('平均評価'))
                //  console.log($(this).html());

                video.img_sample = [];
                $('img.mg-b6').each(function (i_s, elem_s) {
                    video.img_sample.push($(elem_s).attr('src').replace("-", "jp-"));
                });
                //http://pics.dmm.co.jp/digital/video/idbd00334/idbd00334-1.jpg
                //http://pics.dmm.co.jp/digital/video/idbd00334/idbd00334jp-1.jpg

            });
            video.filename = '[' + video.makers[0].name + '] ' + video.title + ' (' + video.number + ')';

            if (callback)
                callback(video);
        }
    });
};

var parseVideoNumber = function (fileName) {
    var splitParseFileName = fileName.split('.');
    if (splitParseFileName.length > 1) {
        var ext = '.' + splitParseFileName[splitParseFileName.length - 1];
        fileName = fileName.substring(0, fileName.length - ext.length);
    }

    var number_array = fileName.match(/[a-zA-Z]+|[0-9]+/g);
    var number = number_array[number_array.length - 2] + '-' + parseVideoNumberDigits(parseInt(number_array[number_array.length - 1]), 5);
    number = number.toUpperCase();

    return number;
}

var parseVideoNumberDigits = function (number, digit) {
    var result = String(number);
    while (result.length < digit) {
        result = '0' + result;
    }
    return result;
}

var parseUrlQuery = function (keyword) {
    var str_url = 'http://www.dmm.co.jp/search/=/searchstr=' + encodeURIComponent(keyword) + '/sort=date/';
    str_url += 'limit=65536/';
    str_url += 'n1=FgRCTw9VBA4GAVhfWkIHWw__/';
    str_url += 'n2=Aw1fVhQKX1ZRAlhMUlo5QQgBU1lR/';
    return str_url;
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = {
    parseList,
    parseVideo,
    parseVideoNumber,
    parseUrlQuery
};