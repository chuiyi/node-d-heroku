var Engine = require('tingodb')(),
    assert = require('assert');

var file = './dmmStorage.db';
var db = new Engine.Db(file, {});

// var fs = require("fs");
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(file);

var findVideo = function (video) {

}

var saveVideo = function (video) {

}

module.exports = {
    saveVideo
};