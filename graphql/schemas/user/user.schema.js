const UsersMutation = require('./user.mutation');
const UsersQuery = require('./user.query');

const Queries = {
    ...UsersQuery,
};

const Mutations = {
    ...UsersMutation,
};

module.exports = { Queries, Mutations };
