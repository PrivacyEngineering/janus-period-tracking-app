import React from 'react';
import ReactDOM from 'react-dom';
import './componment/App.css';
import App from './componment/App';
import reportWebVitals from './componment/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  concat,
  HttpLink,
} from "@apollo/client";

let appJWTToken = localStorage.getItem("token")
const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'})
const authMiddleware = new ApolloLink((operation, forward)=> {
//if in local storage
if (appJWTToken) {
  operation.setContext({
  headers: {
    Authorization: `Bearer ${appJWTToken}`
  }
});
}
  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
});

/*
const App2 = () => (
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
);

ReactDOM.render(<App2 />, document.getElementById('root'));
*/
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
  , document.getElementById('root')
);
reportWebVitals();
