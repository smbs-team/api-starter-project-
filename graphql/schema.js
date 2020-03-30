const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { mergeSchemas } = require('graphql-tools');
const { fileLoader } = require('merge-graphql-schemas');

const path = require('path');

let Queries = {};
let Mutations = {};

fileLoader(path.join(__dirname, './**/*.schema.js')).map((f) => {
    Queries = { ...Queries, ...f.Queries };
    Mutations = { ...Mutations, ...f.Mutations };
    return null;
});

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: { ...Queries },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: { ...Mutations },
});


const IndexSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

const MergedSchema = mergeSchemas({
    schemas: [IndexSchema],
});

module.exports = MergedSchema;
