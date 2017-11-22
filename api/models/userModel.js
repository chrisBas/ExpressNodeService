var joi = require('joi');

module.exports = {
    body: {
        username: joi.string().required(),
        password: joi.string().required(),
        id: joi.number()
    }
};