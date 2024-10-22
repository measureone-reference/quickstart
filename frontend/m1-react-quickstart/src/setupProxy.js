const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 👈🏽 your API endpoint goes here.
    createProxyMiddleware({
      target: `${process.env.REACT_APP_SERVER_URL}`, // 👈🏽 your API URL goes here.
      changeOrigin: true,
    })
  );
};