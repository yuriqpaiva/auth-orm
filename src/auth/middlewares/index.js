module.exports = {
  local: require('./localMiddleware'),
  bearer: require('./bearerMiddleware'),
  refresh: require('./refreshTokenMiddleware'),
};
