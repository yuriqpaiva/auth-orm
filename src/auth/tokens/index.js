const blocklistAccessToken = require('../redis/blocklistAccessToken');
const allowListAccessToken = require('../redis/allowlistRefreshToken');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const moment = require('moment');
const {InvalidTokenByLogout} = require('../../errors/index');

class Token {
  constructor(name, redisList, expirationDate) {
    this.name = name;
    this.redisList = redisList;
    this.expirationDate = expirationDate;
  }

  createJWT(id) {
    const payload = {id};

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: this.expirationDate[0] + this.expirationDate[1],
    });
  }

  async verifyTokenJWT(token) {
    if (this.redisList) {
      await this.verifyTokenOnBlocklist(token);
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  }

  async verifyTokenOnBlocklist(token) {
    const invalidToken = await this.redisList.hasToken(token);

    if (invalidToken) {
      throw new InvalidTokenByLogout(`${this.name} invalidated by logout`);
    }
  }

  async addJWTIntoBlocklist(token) {
    await this.redisList.add(token);
  }

  async invalidateJWT(token) {
    return this.addJWTIntoBlocklist(token);
  }

  async createOpaqueToken(id) {
    const refreshToken = randomBytes(24).toString('hex');
    const expirationDate = moment()
        .add(this.expirationDate[0], this.expirationDate[1])
        .unix();

    await this.redisList.add(refreshToken, id, expirationDate);

    return refreshToken;
  }

  async getOpaqueTokenValue(token) {
    const value = await this.redisList.getValue(token);

    return value;
  }

  async deleteOpaqueToken(token) {
    await this.redisList.deleteValue(token);
  }
}

const accessToken = new Token('access token', blocklistAccessToken, [15, 'm']);
const refresh = new Token('refresh token', allowListAccessToken, [5, 'd']);
const emailToken = new Token('email token', null, [1, 'h']);

module.exports = {accessToken, refresh, emailToken};
