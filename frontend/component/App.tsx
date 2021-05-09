

import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/app.styl'
import { BrowserRouter as Router, Route } from 'react-router-dom';


//redux portion
import store from '../redux/store'
import { Provider } from 'react-redux'

//apollo/graphql portion
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


//this portion enables subscriptions
import { WebSocketLink } from '@apollo/client/link/ws';
const link = new WebSocketLink({
  uri: `ws://localhost:8080/subscriptions`,
  options: {
    reconnect: true
  }
})

const client = new ApolloClient({
   link,
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

// import components
import Welcome from './Welcome'
import Room from './Room'

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Route exact path="/">
            <Welcome />
          </Route>
          
          <Route path="/room">
            <Room />
          </Route>

        </Router>
      </ApolloProvider>
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);