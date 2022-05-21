const jwt = require('jsonwebtoken');
const {createHash} = require('crypto');
const blacklist = require('./blacklist-config');

const {promisify} = require('util');
const setAsync = promisify(blacklist.set).bind(blacklist);
const existsAsync = promisify(blacklist.exists).bind(blacklist);

const generateTokenHash = (token) => {
  return createHash('sha256').update(token).digest('hex');
};

module.exports = {
  add: async (token) => {
    const {exp} = jwt.decode(token);
    const tokenHash = generateTokenHash(token);
    await setAsync(tokenHash, '');
    blacklist.expireat(tokenHash, exp);
  },
  hasToken: async (token) => {
    const tokenHash = generateTokenHash(token);
    const doesTokenExists = await existsAsync(tokenHash);
    return doesTokenExists === 1;
  },
};
