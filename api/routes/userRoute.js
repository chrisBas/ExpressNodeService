'use strict';

module.exports = function(app) {
    var userController = require('../controllers/userController');
    var validate = require('express-validation');
    var userModel = require('../models/userModel');
    var newUserModel = require('../models/newUserModel');
    var userPasswordModel = require('../models/userPasswordModel');

    app.post('/public/login',validate(userModel),userController.login);
    app.post('/public/signup',validate(newUserModel),userController.signup);
    
    app.put('/private/update', validate(userPasswordModel), userController.update);
    app.delete('/private/update', userController.delete);
}