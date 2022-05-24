const database = require('../models');
const Services = require('./Services');

class UserServices extends Services {
  constructor() {
    super('Users');
  }

  async getUserByEmail(email) {
    return database[this.modelName].findOne({where: {email}});
  }

  async verifyUser(id) {
    this.updateRegister({verified: true}, id);
  }
}

module.exports = UserServices;
