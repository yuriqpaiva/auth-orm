const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blocklist = require('./redis/blocklist');
const {randomBytes} = require('crypto');
const moment = require('moment');
const allowList = require('./redis/allowlist');

class Auth {
  static async generateHashPassword(password) {
    const hashCost = 12;
    return bcrypt.hash(password, hashCost);
  }

  static async generateRefreshToken(id) {
    const refreshToken = randomBytes(24).toString('hex');
    const expirationDate = moment().add(5, 'd').unix();

    await allowList.add(refreshToken, id, expirationDate);

    return refreshToken;
  }

  static async login(req, res) {
    const {id} = req.user;

    try {
      const payload = {id};
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = await Auth.generateRefreshToken(id);

      res.set('Authorization', token);
      return res.status(200).json({refreshToken});
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
