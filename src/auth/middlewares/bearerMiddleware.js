const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('bearer', {session: false}, (error, user, infos) => {
    if (error && error.name === 'JsonWebTokenError') {
      return res.status(400).json({message: error.message});
    }

    if (error && error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({erro: error.message, expiredAt: error.expiredAt});
    }

    if (error && error.name === 'InvalidTokenByLogout') {
      return res.status(401).json({erro: error.message});
    }

    if (error) {
      return res.status(500).json({message: error.message});
    }

    req.user = user;
    req.token = infos.token;
    return next();
  })(req, res, next);
};
