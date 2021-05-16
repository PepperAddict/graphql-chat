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
mutation ($theUser: String!, $theMessage: String!, $theFile: String) {
    postMessage(name: $theUser, message: $theMessage, file: $theFile)
  }
`

export const WATCH_MESSAGE = gql`
subscription {
  newMessages {
    _id 
    name 
    message
    date
    file
  }
}
`

export const UPLOAD_IMAGE = gql`
mutation ($file:  Upload!) {
  uploadImage(file: $file) 
}

`

export const REMOVE_MESSAGE = gql`
mutation ($id: ID!) {
  removeMessage(_id: $id)
}
`