'use strict';

module.exports = function(app) {
    var userController = require('../controllers/userController');
    var validate = require('express-validation');
    var validation = require('../models/userModel')

    app.post('/user/login',validate(validation),userController.login);
    app.post('/user/signup',validate(validation),userController.signup);
    
    app.route('/user/update/:id')
        .put(userController.update)
        .delete(userController.delete);
}