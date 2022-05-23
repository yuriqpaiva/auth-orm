const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blocklist = require('./redis/blocklist');
class Auth {
  static async generateHashPassword(password) {
    const hashCost = 12;
    return bcrypt.hash(password, hashCost);
  }

  static async login(req, res) {
    const {id} = req.user;

    try {
      const payload = {id};
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m',
      });

      res.set('Authorization', token);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await blocklist.add(token);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }
}

module.exports = Auth;
