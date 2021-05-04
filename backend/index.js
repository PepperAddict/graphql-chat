const express = require("express");
const app = express();
const path = require("path");

const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {typeDefs, resolvers} = require('./middleware/graphql');


const bodyParser = require('body-parser');
const {ApolloServer} = require('apollo-server-express');

//webpack configuration + hot reloading
require('./middleware/webpack')(app)


//for graphql subscriptions
const subscribers = [];
const onMessages = (sub) => subscribers.push(sub);

//for nedb
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();


const graphqlServer = new ApolloServer({ typeDefs, resolvers, playground: true, context: {database}})
graphqlServer.applyMiddleware({app});


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Express server listening on port ${port}`));
