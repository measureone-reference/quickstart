var express = require('express');
var router = express.Router();

router.post('/get', function (req, res, next) {
    
    const host_name = process.env.M1_API_URL.replace(/^https:\/\//, '');
    
    const response = {
        host_name: host_name,
        access_key: process.env.M1_ACCESS_TOKEN
    }

    res.status(200).json(response);
});

module.exports = router;
