const database = require('../models');

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRegisters() {
    return database[this.modelName].findAll();
  }

  async getOneRegister(id) {
    return database[this.modelName].findOne({where: {id}});
  }

  async createRegister(data) {
    return database[this.modelName].create(data);
  }

  async updateRegister(data, id) {
    return database[this.modelName].update(data, {where: {id}});
  }

  async deleteRegister(id) {
    return database[this.modelName].destroy({where: {id}});
  }
}

module.exports = Services;
