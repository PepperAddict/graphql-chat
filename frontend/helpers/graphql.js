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
mutation postMessageTime($theUser: String!, $theMessage: String!) {
    postMessage(name: $theUser, message: $theMessage)
  }
`