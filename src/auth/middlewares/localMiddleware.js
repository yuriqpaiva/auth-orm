const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('local', {session: false}, (error, user, infos) => {
    req.user = user;
    return next();
  })(req, res, next);
};
