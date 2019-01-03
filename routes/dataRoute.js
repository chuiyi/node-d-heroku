var express = require('express');
var router = express.Router();

var api = require('../api/api');

router.get('/api/dmm/query', api.dmm.query);
router.get('/api/dmm/queryFile', api.dmm.queryFile);
router.get('/api/dmm/video', api.dmm.video);
router.get('/api/dmm/list', api.dmm.list);
router.get('/api/dmm/actress', api.dmm.actress);

module.exports = router;