var express = require('express');
const logger = require('../shared/log');
var router = express.Router();
const base64 = require('base-64'); // npm install base-64
const utf = require('utf8');
const axios = require('axios');
const { head } = require('./services');

/* POST Generate Access Token for MeasureOne */
router.post('/generate_access_token', async function (req, res, next) {

    logger.debug("Generating access token");

    const client_id = process.env.MEASUREONE_CLIENT_ID;
    const client_secret = process.env.MEASUREONE_SECRET;

    var bytes = utf.encode(`${client_id}:${client_secret}`);
    var encoded = base64.encode(bytes);

    const axiosInstance = axios.create({
        baseURL: 'https://api-stg.measureone.com/v3/auth',
        defaults: {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encoded}`
            }
        }

    });

    const response = axiosInstance.post('/generate_access_token')
        .then((response) => {
            const access_token = response.data.access_token;
            process.env.access_token = access_token;
        })
        .catch(error => console.error('Error:', error));



    res.status(200).json({ message: "Access token generated successfully" });
});

router.post("/generate_public_token", function (req, res, next) {




    res.status(200).json({ message: "Public token generated successfully" });
});

router.post("/invalidate_token", function (req, res, next) {

});

module.exports = router;
