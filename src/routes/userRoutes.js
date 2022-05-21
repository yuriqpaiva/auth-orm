const {Router} = require('express');
const UsersController = require('../controllers/UsersController');

const route = Router();

route.get('/users', UsersController.getAllUsers);

module.exports = route;
