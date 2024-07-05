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
        axios.post(`${process.env.M1_API_URL}/v3/individuals/get_by_id`, { id: response.data?.id }, {
            headers
        }).then((response) => {
            logger.info(`Individual retrieved: ${response.data}`);
            res.status(200).json(response.data);
        }).catch((error) => {
            logger.error(`Error retrieving Individual: ${error}`);
            res.status(500).json({ message: "Error retrieving Individual", error: error });
        });
    }).catch((error) => {
        logger.error(`Error creating Individual: ${error}`);
        res.status(500).json({ message: "Error creating Individual", error: error });
    });

});


/* POST create an Individual */



module.exports = router;
