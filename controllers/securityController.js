const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');
const fs = require('fs');
const models = require('../models');
const wrapper = require('../middlewares/errorWrapper');
const ValidationError = require('../helpers/ValidationError');

router.post('/login', wrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ValidationError('Email and Password are required', 422);
    }

    const user = await models.User.confirmUser(email, password);

    if (!user) {
        throw new ValidationError('Invalid Credentials', 403);
    }

    const payload = {
        id: user.id,
        email: user.email,
    };

    const privateKey = fs.readFileSync(`${__appRoot}/private.key`, 'utf8');
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

    if (!token) {
        throw new ValidationError('Internal error', 500);
    }

    return res.status(200).send({ data: token });
}));

module.exports = router;
