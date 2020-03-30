const { InsertTypes, UserType } = require('./user.types');

const models = require('../../../models');

const UsersMutation = {
    addUser: {
        type: UserType,
        description: 'Add User record to database',
        args: {
            user: { type: InsertTypes.inputInsertUser },
        },
        resolve(root, args) {
            return models.User.insert(args.user);
        },
    },
};

module.exports = UsersMutation;
