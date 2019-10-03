const proxy = require('http-proxy-middleware');
// const config = require("./config.js");

module.exports = function(app) {
  app.use(proxy('/auth/callback', { target: 'https://authnominations.ecstag.opensource.lk' }));
  app.use(proxy('/signin', { target: 'https://authnominations.ecstag.opensource.lk' }));
  app.use(proxy('/create-pdf', { target: 'http://nominations-pdf-20keps.pxe-dev-platformer-1552477983757-1pdna.svc' }));
};
