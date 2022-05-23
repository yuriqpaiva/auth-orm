const redis = require('redis');
const jwt = require('jsonwebtoken');
const redisManipulation = require('./redis-manipulation');
const {createHash} = require('crypto');

const blocklist = redis.createClient({prefix: 'blocklist-access-token:'});

const blocklistManipulation = redisManipulation(blocklist);

const generateTokenHash = (token) => {
  return createHash('sha256').update(token).digest('hex');
};

module.exports = {
  add: async (token) => {
    const expirationDate = jwt.decode(token).exp;
    const tokenHash = generateTokenHash(token);
    await blocklistManipulation.add(tokenHash, '', expirationDate);
  },
  hasToken: async (token) => {
    const hashToken = generateTokenHash(token);
    return blocklistManipulation.existsKey(hashToken);
  },
};
