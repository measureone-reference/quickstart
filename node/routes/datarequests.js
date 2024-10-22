var express = require('express');
const logger = require('../shared/log');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.post('/new', function (req, res, next) {

  logger.info(`Creating a new Data Request with token ${process.env.M1_ACCESS_TOKEN}`);

  const headers = {
    'Authorization': `Bearer ${process.env.M1_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }

  const webhooks = [
    "datasource.connected",
    "datarequest.items_available", 
    "datarequest.report_available", 
    "datarequest.no_items",
    "session.rejected"
  ];

  const webhook_url = `${process.env.NGROK_URL}/webhooks/recieve_webhook`;
  const webhook_delivery_details = webhooks.map((value) => ({ event_type: value,  url: webhook_url}));

  let datarequest_payload = {
    individual_id: req.body.individual_id,
    type: req.body.type,
    request_details: {},
    delivery_details: webhook_delivery_details
  }

  console.log("datarequest_payload", datarequest_payload);

  axios.post(`${process.env.M1_API_URL}/v3/datarequests/new`, datarequest_payload, {
    headers

  }).then((response) => {
    logger.info(`Data Request created: ${response.data}`);
    axios.post(`${process.env.M1_API_URL}/v3/datarequests/get_by_id`, { id: response.data?.id }, {
      headers
    }).then((response) => {
      logger.info(`data request retrieved retrieved: ${response.data}`);
      res.status(200).json(response.data);
    }).catch((error) => {
      logger.error(`Error retrieving Individual: ${error}`);
      res.status(500).json({ message: "Error retrieving Individual", error: error });
    });
  }).catch((error) => {
    logger.error(`Error creating Individual: ${error}`);
    logger.error(error.response.data);
    res.status(500).json({ message: "Error creating Individual", error: JSON.stringify(error.response.data) });
  });
});

module.exports = router;



