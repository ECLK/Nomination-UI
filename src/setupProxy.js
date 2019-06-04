const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/callback', { target: 'http://localhost:3001/' }));
  app.use(proxy('/signin', { target: 'http://localhost:3001/' }));
};