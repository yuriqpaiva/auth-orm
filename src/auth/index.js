const bcrypt = require('bcrypt');
const {accessToken, refresh} = require('./tokens');
const UsersServices = require('../services/UsersServices');
const userServices = new UsersServices();
class Auth {
  static async generateHashPassword(password) {
    const hashCost = 12;
    return bcrypt.hash(password, hashCost);
  }

  static async login(req, res) {
    const {id} = req.user;

    try {
      const token = accessToken.createJWT(id);
      const refreshToken = await refresh.createOpaqueToken(id);

      res.set('Authorization', token);
      return res.status(200).json({refreshToken});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await accessToken.invalidateJWT(token);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  static async verifyEmail(req, res) {
    try {
      await userServices.verifyUser(req.user.id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }
}

module.exports = Auth;
