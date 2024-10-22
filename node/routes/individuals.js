var express = require('express');
const logger = require('../shared/log');
var router = express.Router();
const axios = require('axios');

/* POST create an Individual */
router.post('/new', function (req, res, next) {

    logger.info(`Creating an Individual with token ${process.env.M1_ACCESS_TOKEN}`);
    const headers = {
        'Authorization': `Bearer ${process.env.M1_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
    axios.post(`${process.env.M1_API_URL}/v3/individuals/new`, req.body, {
        headers

    }).then((response) => {
        logger.info(`Individual created: ${response.data}`);
        res.status(200).json(response.data);
    }).catch((error) => {
        logger.error(`Error creating Individual: ${error}`);
        res.status(500).json({ message: "Error creating Individual", error: error });
    });

});

module.exports = router;
