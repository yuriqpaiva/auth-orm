const bcrypt = require('bcrypt');

module.exports = {
  async generateHashPassword(password) {
    const hashCost = 12;
    return bcrypt.hash(password, hashCost);
  },
};


