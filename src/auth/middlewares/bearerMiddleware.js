const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate(
      'bearer',
      {session: false},
      (error, user, infos) => {
        req.user = user;
        req.token = infos.token;
        return next();
      },
  )(req, res, next);
};
