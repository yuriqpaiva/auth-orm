const jwt = require('jsonwebtoken');
const {createHash} = require('crypto');
const blacklist = require('./blacklist-config');

const generateTokenHash = (token) => {
  return createHash('sha256').update(token).digest('hex');
};

module.exports = {
  add: async (token) => {
    await blacklist.connect();
    const {exp} = jwt.decode(token);
    const tokenHash = generateTokenHash(token);
    await blacklist.set(tokenHash, '');
    blacklist.expireAt(tokenHash, exp);
  },
  hasToken: async (token) => {
    await blacklist.connect();

    const tokenHash = generateTokenHash(token);
    const doesTokenExists = await blacklist.exists(tokenHash);
    return doesTokenExists === 1;
  },
};
