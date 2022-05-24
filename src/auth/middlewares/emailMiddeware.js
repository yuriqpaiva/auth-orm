const {emailToken} = require('../tokens');
const UsersServices = require('../../services/UsersServices');
const {InvalidArgument} = require('../../errors');
const userServices = new UsersServices();

module.exports = async (req, res, next) => {
  try {
    const {token} = req.params;

    const id = await emailToken.verifyTokenJWT(token);
    const user = await userServices.getOneRegister(id);

    if (!user) {
      throw new InvalidArgument('Invalid params');
    }

    req.user = user;

    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({error: error.message});
    }

    if (error.name === 'TokenExpiredError') {
      return res
          .status(401)
          .json({error: error.message, expiradoEm: error.expiredAt});
    }

    return res.status(500).json({error: error.message});
  }
};
