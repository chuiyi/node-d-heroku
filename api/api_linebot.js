var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    console.log("LLLLLLLLINE: " + JSON.stringify(req.body))
    res.append('X-Line-Request-Id', '')
    res.status(200).send('ok')
})