const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('local', {session: false}, (error, user, infos) => {
    if (error && error.name === 'InvalidArgument') {
      return res.status(400).json({message: error.message});
    }

    if (error && error.name === 'NotFound') {
      return res.status(404).json({message: error.message});
    }

    if (error) {
      return res.status(500).json({message: error.name});
    }

    req.user = user;
    return next();
  })(req, res, next);
};
