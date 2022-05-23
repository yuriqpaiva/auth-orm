const passport = require('passport');
const {Strategy} = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const {UsersServices} = require('../../services/');
const userServices = new UsersServices();
const blocklist = require('../redis/blocklist');
const {InvalidTokenByLogout} = require('../../errors');

const verifyTokenOnBlacklist = async (token) => {
  const invalidToken = await blocklist.hasToken(token);

  if (invalidToken) {
    throw new InvalidTokenByLogout('Token invalidated by logout');
  }
};

passport.use(
    new Strategy(async (token, done) => {
      try {
        await verifyTokenOnBlacklist(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userServices.getOneRegister(payload.id);

        done(null, user, {token});
      } catch (error) {
        done(error);
      }
    }),
);
