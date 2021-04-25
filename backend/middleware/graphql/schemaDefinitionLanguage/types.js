const {gql} = require('apollo-server-express');
const types = gql`

  # Types 

  type Message {
    id: ID!
    user: User!
    message: String!
  }
  type User {
      name: String!
  }

  # Queries

  type Query {
      getAllMessages: [Message]!
  }

  # Mutations 

  type Mutation {
    postMessage(user: String!, content: String!, room: String!): String!

  }
  type Subscription {
    liveMessages: [Message]
  }
`;

module.exports = {types}