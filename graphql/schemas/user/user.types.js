const {
 GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLInt,
} = require('graphql');
const UserFields = require('./user.fields');

const InsertTypes = {
    inputInsertUser: new GraphQLInputObjectType({
        name: 'inputInsertUser',
        description: 'Inputs for Insert Users Mutation',

        fields: {
            ...UserFields,
        },
    }),
    inputUpdateUser: new GraphQLInputObjectType({
        name: 'inputUpdateUser',
        description: 'Inputs for Users Fields Mutation',

        fields: {
            id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'Levels Id',
            },
            ...UserFields,
        },
    }),
};

const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'This is for Users Table',
    fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'User Id',
            },
            ...UserFields,

        }),
});

module.exports = { InsertTypes, UserType };
