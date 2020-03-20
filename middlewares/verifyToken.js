const jwt = require('jsonwebtoken');
const fs = require('fs');

const wrapper = require('./errorWrapper');

const verifyToken = wrapper((req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(!bearerHeader) {
        throw { status: 400, message: "Invalid request" };
    }

    const token = bearerHeader.split(' ')[1];
    const publicKey = fs.readFileSync(`${__appRoot}/public.key`, 'utf8');

    try {
        jwt.verify(token, publicKey, {algorithm:  ["RS256"], expiresIn:  "1h",});        
    } catch (error) {
        throw { status: 403, message: "Invalid token" }        
    }

    next();
});

module.exports = verifyToken;