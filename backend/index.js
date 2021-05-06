const express = require("express");
const app = express();
const path = require("path");
const {execute, subscribe} = require('graphql')
const {makeExecutableSchema} = require('graphql-tools');
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {typeDefs, resolvers} = require('./middleware/graphql');
const schema = makeExecutableSchema({typeDefs, resolvers})

const {ApolloServer, PubSub} = require('apollo-server-express');

//webpack configuration + hot reloading
require('./middleware/webpack')(app)


//for nedb
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

//The necessities to get graphql subscription to work
const { createServer } = require('http')
const subServ = createServer(app);

//subscription will be at /subscriptions
subServ.listen(8080, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: subServ,
      path: '/subscriptions',
    });
});

//setting up our graphql server
const graphqlServer = new ApolloServer({ typeDefs, resolvers, playground: true, context: ({req, res}) => ({req, res, database}), subscriptions: {path: '/subscriptions'} })
graphqlServer.applyMiddleware({app});


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

