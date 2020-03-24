const joi = require('@hapi/joi');
const schemas = {
    userCreation: joi.object().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(/^[a-zA-Z0-9]{8,16}$/)
    })
}

module.exports = schemas;