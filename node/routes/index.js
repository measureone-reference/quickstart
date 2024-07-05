var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Backend APIs to integrate with MeasureOne', 
    instructions: "You can refer to routes folder in the source code to understand about all the endpoints exposed in this application" });
});

module.exports = router;
