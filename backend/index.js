const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const {execute, subscribe} = require('graphql')
const {makeExecutableSchema} = require('graphql-tools');
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {typeDefs, resolvers} = require('./middleware/graphql');
const schema = makeExecutableSchema({typeDefs, resolvers});

//file upload
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './public/images');
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
});


var upload = multer({ storage: storage });

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
const graphqlServer = new ApolloServer({ typeDefs, resolvers, context: (req, res) => ({req, res}), playground: true, subscriptions: {path: '/subscriptions'} })
graphqlServer.applyMiddleware({app});

app.use(cors())

app.get(["/", "/room"], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});
app.use('/static', express.static('public'))

app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send(`http://localhost:8080/static/images/${req.file.originalname}`)
})

