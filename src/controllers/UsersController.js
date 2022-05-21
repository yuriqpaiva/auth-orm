const database = require('../models');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await database.Users.findAll();

      res.status(200).json(users);
    } catch (erro) {
      res.status(500).json({message: erro.message});
    }
  }
}

module.exports = UserController;
