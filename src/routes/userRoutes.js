const {Router} = require('express');
const UsersController = require('../controllers/UsersController');
const passport = require('passport');
const Auth = require('../auth');

const route = Router();

route
    .post(
        '/login',
        passport.authenticate('local', {session: false}),
        Auth.login,
    )
    .get('/users', UsersController.getAllUsers)
    .get('/users/:id', UsersController.getOneUserById)
    .post('/users', UsersController.createUser)
    .put('/users/:id', UsersController.updateUser)
    .delete('/users/:id', UsersController.deleteUser);

module.exports = route;
