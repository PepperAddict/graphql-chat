const express = require("express");
const app = express();
const path = require("path");
const graphqlHTTP = require("express-graphql");
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {types, resolvers} = require('./middleware/graphql');


const bodyParser = require('body-parser');
const {ApolloServer} = require('apollo-server-express');

//webpack configuration + hot reloading
require('./middleware/webpack')(app)


//const { execute, subscribe } = require("graphql");

//for graphql subscriptions
const subscribers = [];
const onMessages = (sub) => subscribers.push(sub);

//for nedb
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();
database.insert({name: "hellooo", message: "hello"})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

//put them together to create a schema for the endpoint
// const schema = makeExecutableSchema({
//   typeDefs: types, 
//   resolvers: roots
// })


//graphql server endpoint
// app.use('/graphql', (req, res) => {
//   graphqlHTTP({
//     schema,
//     graphiql: true, 
//     subscriptionsEndpoint: `ws://localhost:8080/subscriptions`,
//     context: {database, req, res},
//     introspection: true,
//   })(req, res)
// })

const graphqlServer = new ApolloServer({ typeDefs: types, resolvers, context: {database}})
graphqlServer.applyMiddleware({app});


//the subscription endpoint
// const subServer = require("http").createServer();
// subServer.listen(3000, () => {
//   new SubscriptionServer(
//     {
//       execute,
//       subscribe,
//       schema,
//     },
//     {
//       server: subServer,
//       path: "/subscriptions",
//       context: { database, onMessages },
//     }
//   );
// });



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Express server listening on port ${port}`));
