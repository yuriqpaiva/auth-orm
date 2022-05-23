const UsersServices = require('../../services/UsersServices');
const userServices = new UsersServices();
const {InvalidArgument} = require('../../errors');
const {refresh} = require('../tokens/index');

module.exports = async (req, res, next) => {
  try {
    const {refreshToken} = req.body;

    const id = await refresh.getOpaqueTokenValue(refreshToken);

    await refresh.deleteOpaqueToken(refreshToken);
    req.user = await userServices.getOneRegister(id);

    if (!id) {
      throw new InvalidArgument('Invalid Token');
    }

    next();
  } catch (error) {
    if (error.name === 'InvalidArgument') {
      return res.status(401).json({error: error.message});
    }

    return res.status(500).json({error: error.message});
  }
};
