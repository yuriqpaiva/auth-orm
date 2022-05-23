const redis = require('redis');
const redisManipulation = require('./redis-manipulation');

const allowList = redis.createClient({prefix: 'allow-list-refresh-token:'});

module.exports = redisManipulation(allowList);
