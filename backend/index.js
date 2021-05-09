const express = require("express");
const app = express();
const path = require("path");
const {execute, subscribe} = require('graphql')
const {makeExecutableSchema} = require('graphql-tools');
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {typeDefs, resolvers} = require('./middleware/graphql');
const schema = makeExecutableSchema({typeDefs, resolvers})

const {ApolloServer, PubSub} = require('apollo-server-express');
const pubsub = new PubSub();

//webpack configuration + hot reloading
require('./middleware/webpack')(app)


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
      path: '/subscriptions'
    });
});

//setting up our graphql server
const graphqlServer = new ApolloServer({ typeDefs, resolvers, context: {pubsub}, playground: true, subscriptions: {path: '/subscriptions'} })
graphqlServer.applyMiddleware({app});


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

