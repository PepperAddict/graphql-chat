const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const {execute, subscribe} = require('graphql')
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {ApolloServer} = require('apollo-server-express');

//two schemas to choose from but achieve the same purpose. schema is SDL and gqlSchema is GraphQL Object Type.
const {schema, gqlSchema} = require('./middleware/graphql');

//file upload using multer because graphQL upload front-end doesn't work with subscription (yet)
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


//webpack server configuration + hot reloading
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
const graphqlServer = new ApolloServer({ schema, context: (req, res) => ({req, res}), playground: true, subscriptions: {path: '/subscriptions'} })
graphqlServer.applyMiddleware({app});

//I forgot why I added cors and too afraid to remove to find out why.
app.use(cors())

// from react, I only have two routes
app.get(["/", "/room"], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

//this way images can be accessed staticly. 
app.use('/static', express.static('public'))

//The upload post endpoint should output the image link
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send(`http://localhost:8080/static/images/${req.file.originalname}`)
})

