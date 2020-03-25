const express = require('express');

const router = express.Router();
const models = require('../models');

const wrapper = require('../middlewares/errorWrapper');
const validator = require('../middlewares/schemaValidator');
const userSchemas = require('../schemas/userSchemas');

/**
 * @swagger
 * paths:
 *    definitions:
 *       user:
 *           properties:
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              isActive:
 *                  type: boolean
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '/api/swagger.json#paths/definitions/user'
 */
router.get('/', wrapper(async (req, res) => {
    const users = await models.User.fetchAll();
    return res.status(200).send({ data: users });
}));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '/api/swagger.json#paths/definitions/user'
 */
router.get('/:id', wrapper(async (req, res) => {
    const user = await models.User.fetchById(req.params.id);
    return res.status(200).send({ data: user });
}));

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '/api/swagger.json#paths/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/create', validator(userSchemas.userCreation), wrapper(async (req, res) => {
    const newUser = await models.User.insert(req.body);
    return res.status(200).send({ data: newUser });
}));

/**
 * @swagger
 * /api/puppies/{id}:
 *   post:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.post('/delete/:id', wrapper(async (req, res) => {
    const deleted = await models.User.remove(req.params.id);
    return res.status(200).send({ data: deleted });
}));

module.exports = router;
