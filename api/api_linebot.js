const line = require('@line/bot-sdk');
var express = require('express');
var router = express.Router();

const config = {
    channelId: '1577031194',
    channelSecret: '3d9689b03d5cee7f534a89ff9ce0b211',
    channelAccessToken: 'SzwQw+G1cSQMyNjLOmDv4Z31S4ggaHjATQJgfHIIaZjr7yb3nZ2k1HC1MPqQVYjkvNqkWP1DIfChR3uT2n70kpKusNqSzAPnw4WkMdrJPpafRb8dzt7bqnfOoRfPmfKqjIlNtZyI3GILUgnB9f+zOAdB04t89/1O/w1cDnyilFU=',
}

const client = new line.Client(config);

router.post('/callback', line.middleware(config), function(req, res) {
    console.log('LINEBOT_CALLBACK');
    res.json(req.body.events) // req.body will be webhook event object




    // var echoMessage = {
    // 	type: 'text',
    // 	text: JSON.stringify(req.body.events)
    // }

    // Promise
    //     .all(req.body.events.map(echoEvent))
    //     .then((result) => res.sendStatus(200).json(result))
    //     .catch((err) => {
    //         console.error('LINEBOT_ERROR: ' + err);
    //         res.status(500).end();
    //     });
});


// event handler
function echoEvent(event) {
    console.log('LINEBOT_HANDLE_EVENT');
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }

    // create a echoing text message
    const echoMessage = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echoMessage);
}

module.exports = router;