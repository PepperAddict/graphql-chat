import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
query {
    getAllMessages {
      name
      message
    }
  }
`;

export const POST_MESSAGE = gql`
mutation ($theUser: String!, $theMessage: String!) {
    postMessage(name: $theUser, message: $theMessage)
  }
`

export const WATCH_MESSAGE = gql`
subscription {
  newMessages {
    _id 
    name 
    message
  }
}
`