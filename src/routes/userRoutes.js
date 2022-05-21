const {Router} = require('express');
const UsersController = require('../controllers/UsersController');

const route = Router();

route
    .get('/users', UsersController.getAllUsers)
    .get('/users/:id', UsersController.getOneUser)
    .post('/users', UsersController.createUser)
    .put('/users/:id', UsersController.updateUser)
    .delete('/users/:id', UsersController.deleteUser)
;

module.exports = route;
