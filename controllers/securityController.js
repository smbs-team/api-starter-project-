const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');
const fs = require('fs');
const models = require('../models');
const wrapper = require('../middlewares/errorWrapper');

router.post('/login', wrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw { status: 422, message: "Email and Password are required" }
    }

    const user = await models.User.confirmUser(email, password);

    if(!user) {
        throw { status: 403, message: "Invalid Credentials" }
    }

    const payload = {
        id: user.id,        
        email: user.email
    };

    const privateKey  = fs.readFileSync(`${__appRoot}/private.key`, 'utf8');
    const token = jwt.sign(payload, privateKey, {algorithm:  "RS256", expiresIn: "1h"});    

    if(!token) {
        throw { status: 500, message: "Internal error" };
    }

    return res.status(200).send({ data: token });
}));

module.exports = router;