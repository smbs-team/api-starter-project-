const { GraphQLString, GraphQLBoolean } = require('graphql');

const UserFields = {
    firstName: {
        type: GraphQLString,
        description: 'User firstName',
    },
    lastName: {
        type: GraphQLString,
        description: 'User lastName',
    },
    email: {
        type: GraphQLString,
        unique: true,
    },
    password: {
        type: GraphQLString,
        description: 'User password',
    },
    isActive: {
        type: GraphQLBoolean,
        description: 'Is Active',
    },
};


module.exports = UserFields;
