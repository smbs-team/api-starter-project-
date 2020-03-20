const express = require("express");
const router = express.Router();
const models = require('../models');
const wrapper = require('../middlewares/errorWrapper');

router.get('/', wrapper( async (req, res) => {
    const users = await models.User.fetchAll();
    return res.status(200).send({ data: users });
}));

router.get('/:id', wrapper(async(req, res) => {
    console.log(req.params);
    const user = await models.User.fetchById(req.params.id);
    return res.status(200).send({ data: user });
}));

router.post('/create', wrapper(async(req, res) => {
    const newUser = await models.User.insert(req.body);
    return res.status(200).send({ data: newUser });
}));

router.post('/delete/:id', wrapper(async(req, res) => {
    const deleted = await models.User.remove(req.params.id);
    return res.status(200).send({ data: deleted });
}));

module.exports = router;