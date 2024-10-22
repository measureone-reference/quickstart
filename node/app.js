var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('./shared/log');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const individualRouter = require('./routes/individuals');
const datarequestRouter = require('./routes/datarequests');
const webhookRouter = require('./routes/webhooks');
const { log } = require('console');
const base64 = require('base-64');
const axios = require('axios');
const ngrok = require('ngrok');
var app = express();
const cors = require('cors');



require("dotenv").config({
  path: `.env`,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

(async () => {

  logger.info("Starting the server ...");
  logger.info("Generating M1 API access token ...");
  const M1_CLIENT_ID = process.env.M1_CLIENT_ID;
  const M1_CLIENT_SECRET = process.env.M1_CLIENT_SECRET;
  const M1_API_URL = process.env.M1_API_URL;

  console.log("M1_CLIENT_ID", M1_CLIENT_ID);
  console.log("M1_CLIENT_SECRET", M1_CLIENT_SECRET);
  console.log("M1_API_URL", M1_API_URL);

  const base64String = Buffer.from(`${M1_CLIENT_ID}:${M1_CLIENT_SECRET}`).toString('base64');
  logger.info(`Base64 encoded string: ${base64String}`);
  const authHeader = `Basic ${base64String}`;
  logger.info(`Auth header: ${authHeader}`);

  try {
    const response = await axios.post(`${M1_API_URL}/v3/auth/generate_access_token`, {}, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    console.log("response.data", response.data);

    // set the access token in the environment for use in the application
    process.env.M1_ACCESS_TOKEN = response.data.access_token;
    process.env.M1_API_URL = M1_API_URL;

    //initiate nGrok to expose the local server to the internet and receive webhooks
    try{
    const url = await ngrok.connect(3000);
    logger.info(`Webbook listener is available at ${url}`);
    process.env.NGROK_URL = url;
  }catch(error){
    logger.error(`Error starting ngrok: ${error}`);
  }

    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    app.use('/individuals', individualRouter);
    app.use('/datarequests', datarequestRouter);
    app.use('/webhooks', webhookRouter);
    app.use(function (req, res, next) {
      next(createError(404));
    });
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    logger.info("Server started successfully");
  } catch (error) {
    logger.error(`Error generating MeasureOne access token: ${error}`);
    logger.error(`Please ensure that your M1_CLIENT_ID and M1_SECRET are available in the .env file ${error}`);
    process.exit(1);
  }



})();



// catch 404 and forward to error handler


// error handler


module.exports = app;
