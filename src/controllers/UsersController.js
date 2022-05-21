const {UsersServices} = require('../services');
const userServices = new UsersServices();
const Auth = require('../auth');
class UserController {
  static async getAllUsers(_req, res) {
    try {
      const users = await userServices.getAllRegisters();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  static async getOneUser(req, res) {
    const {id} = req.params;

    try {
      const user = await userServices.getOneRegister(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  static async createUser(req, res) {
    const data = req.body;

    try {
      const passwordHashed = await Auth.generateHashPassword(data.password);

      const userData = {email: data.email, password: passwordHashed};

      const createdUser = await userServices.createRegister(userData);

      return res.status(200).json(createdUser);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  static async updateUser(req, res) {
    const {id} = req.params;
    const userDataToUpdate = req.body;

    try {
      await userServices.updateRegister(userDataToUpdate, id);

      const userFinded = await userServices.getOneRegister(id);

      return res.status(200).json(userFinded);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  static async deleteUser(req, res) {
    const {id} = req.params;

    try {
      await userServices.deleteRegister(id);

      return res.status(204).json({message: 'Your user was deleted'});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }
}

module.exports = UserController;
