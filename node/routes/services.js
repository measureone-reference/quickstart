var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/get_insurance_details', function (req, res, next) {
  res.json(200).json({ message: "Insurance details fetched successfully" });
});

module.exports = router;
