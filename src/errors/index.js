class InvalidTokenByLogout extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTokenByLogout';
  }
}

class InvalidArgument extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidArgument';
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
  }
}

module.exports = {
  InvalidTokenByLogout,
  InvalidArgument,
  NotFound,
};
