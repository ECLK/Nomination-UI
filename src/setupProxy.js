const proxy = require('http-proxy-middleware');
// import {AUTH_APP_URL} from './config.js';

module.exports = function(app) {
  app.use(proxy('/auth/callback', { target: 'http://localhost:3001/' }));
  app.use(proxy('/signin', { target: 'http://localhost:3001/' }));
  app.use(proxy('/create-pdf', { target: 'http://localhost:5000/' }));
};