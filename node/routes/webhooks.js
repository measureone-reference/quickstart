var express = require('express');
const logger = require('../shared/log');
var router = express.Router();
const axios = require('axios');
const SSE = require('express-sse');
const sse = new SSE();

router.post('/recieve_webhook', function (req, res, next) {
    logger.info(`Received a webhook: ${JSON.stringify(req.body)}`);
    sse.send(req.body);
});

router.get("/stream", sse.init); 

module.exports = router;