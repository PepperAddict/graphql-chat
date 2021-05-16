  
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const {makeExecutableSchema} = require('graphql-tools');

//these two are for the SDL way
const {typeDefs} = require('./schema_one/types');
const {resolvers} = require('./schema_one/resolver')
//create schem from typedefs and resolvers
const schema = makeExecutableSchema({typeDefs, resolvers});

//below is the GraphQL Object way
const postMessage = require('./schema_two/postMessage')
const getAllMessages = require('./schema_two/getAllMessages')
const newMessages = require('./schema_two/newMessages')
const removeMessage = require('./schema_two/removeMessage')

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({getAllMessages})
})
const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({postMessage, removeMessage}) 
})
const RootSubscriptionType = new GraphQLObjectType({
    name: 'RootSubscription',
    fields: () => ({newMessages})
})
// stitch query/mutation/subscription into a schema 
const gqlSchema = new GraphQLSchema({query: RootQueryType, mutation: RootMutationType, subscription: RootSubscriptionType})

//typedef and resolvers is the SDL way and gqlSchema is the stitched GraphQL Object way
module.exports = {schema, gqlSchema}