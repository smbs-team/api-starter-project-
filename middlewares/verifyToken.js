const jwt = require('jsonwebtoken');
const fs = require('fs');

const wrapper = require('./errorWrapper');
const ValidationError = require('../helpers/ValidationError');

const verifyToken = wrapper((req, _res, next) => {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        throw new ValidationError('Invalid request', 400);
    }

    const token = bearerHeader.split(' ')[1];
    const publicKey = fs.readFileSync(`${__appRoot}/public.key`, 'utf8');

    try {
        jwt.verify(token, publicKey, { algorithm: ['RS256'], expiresIn: '1h' });
    } catch (error) {
        throw new ValidationError('Invalid token', 403);
    }

    next();
});

module.exports = verifyToken;
