const passport = require('passport');
const {Strategy} = require('passport-http-bearer');
const {UsersServices} = require('../../services/');
const userServices = new UsersServices();
const {accessToken} = require('../tokens');

passport.use(
    new Strategy(async (token, done) => {
      try {
        const id = await accessToken.verifyTokenJWT(token);
        const user = await userServices.getOneRegister(id);

        done(null, user, {token});
      } catch (error) {
        done(error);
      }
    }),
);
