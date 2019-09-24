const proxy = require('http-proxy-middleware');
import {AUTH_BASE_URL} from "./config.js";

module.exports = function(app) {
  app.use(proxy('/auth/callback', { target: AUTH_BASE_URL , logLevel:'debug'}));
  app.use(proxy('/signin', { target: AUTH_BASE_URL , logLevel:'debug'}));
  app.use(proxy('/create-pdf', { target: 'http://localhost:5000/' , logLevel:'debug' }));
};
