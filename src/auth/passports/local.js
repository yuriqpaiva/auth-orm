const passport = require('passport');
const {Strategy} = require('passport-local');
const {UsersServices} = require('../../services/index');
const userServices = new UsersServices();
const bcrypt = require('bcrypt');
const {InvalidArgument, NotFound} = require('../../errors');

const verifyUser = async (user) => {
  if (!user) {
    throw new NotFound('E-mail does not exists');
  }
};

const verifyPassword = async (requestPassword, databasePassword) => {
  const isPasswordValid = await bcrypt.compare(
      requestPassword,
      databasePassword,
  );

  if (!isPasswordValid) {
    throw new InvalidArgument('E-mail or password invalid');
  }
};

passport.use(
    new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          session: false,
        },
        async (email, password, done) => {
          try {
            const user = await userServices.getUserByEmail(email);

            await verifyUser(user);
            await verifyPassword(password, user.password);

            done(null, user);
          } catch (error) {
            done(error);
          }
        },
    ),
);
