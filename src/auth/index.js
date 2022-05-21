const bcrypt = require('bcrypt');

class Auth {
  static async generateHashPassword(password) {
    const hashCost = 12;
    return bcrypt.hash(password, hashCost);
  }
};

module.exports = Auth;


