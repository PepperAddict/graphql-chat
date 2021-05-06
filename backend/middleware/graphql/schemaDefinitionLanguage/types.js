const {gql} = require('apollo-server-express');
const typeDefs = gql`
  # Types 
  type Message {
    "The ID was generated by NeDB"
    _id: ID!
    name: String!
    message: String!
  }

  # Queries
  type Query {
      "This will retrieve a list of messages using neDB"
      getAllMessages: [Message]!
  }

  # Mutations 
  type Mutation {
    postMessage(name: String!, message: String!): Boolean!
  }

  #Subscription
  type Subscription {
    newMessages: Message
  }
`;

module.exports = {typeDefs}


