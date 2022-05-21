const passport = require('passport');
const {Strategy} = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const {UsersServices} = require('../../services/');
const userServices = new UsersServices();

passport.use(
    new Strategy(async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userServices.getOneRegister(payload.id);

        done(null, user, {token});
      } catch (error) {
        done(error);
      }
    }),
);
