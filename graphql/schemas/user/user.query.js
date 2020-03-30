const { GraphQLInt, GraphQLList, GraphQLBoolean } = require('graphql');
const { UserType } = require('./user.types');
const models = require('../../../models');

const UsersQuery = {
    users: {
        type: new GraphQLList(UserType),
        description: 'List of Users',
        args: {
            id: {
                type: GraphQLInt,
            },
            isActive: {
                type: GraphQLBoolean,
            },
        },
        // eslint-disable-next-line no-unused-vars
        resolve(root, args) {
            return models.User.findAll();
        },
    },
};

module.exports = UsersQuery;
