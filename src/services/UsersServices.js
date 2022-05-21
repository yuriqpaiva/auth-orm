const Services = require('./Services');

class UserServices extends Services {
  constructor() {
    super('Users');
  }
}

module.exports = UserServices;
