const {Router} = require('express');
const UsersController = require('../controllers/UsersController');
const Auth = require('../auth');
const {local, bearer, refresh, email} = require('../auth/middlewares');

const route = Router();

route
    .post('/logout', [refresh, bearer], Auth.logout)
    .get('/users', UsersController.getAllUsers)
    .get('/users/:id', UsersController.getOneUserById)
    .get('/users/verifyEmail/:token', email, Auth.verifyEmail)
    .post('/login', local, Auth.login)
    .post('/users', UsersController.createUser)
    .post('/users/updateAccessToken', refresh, Auth.login)
    .put('/users/:id', UsersController.updateUser)
    .delete('/users/:id', bearer, UsersController.deleteUser);

module.exports = route;
