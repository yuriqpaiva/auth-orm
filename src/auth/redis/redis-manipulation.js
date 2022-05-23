const {promisify} = require('util');

module.exports = (redisList) => {
  const setAsync = promisify(redisList.set).bind(redisList);
  const existsAsync = promisify(redisList.exists).bind(redisList);

  return {
    add: async (key, value, expirationDate) => {
      await setAsync(key, value);
      redisList.expireat(key, expirationDate);
    },
    existsKey: async (key) => {
      const doesTokenExists = await existsAsync(key);
      return doesTokenExists === 1;
    },
  };
};
