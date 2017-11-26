var joi = require('joi');

module.exports = {
    body: {
        password: joi.string().required()
    }
};