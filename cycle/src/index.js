import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  ApolloLink,
  concat,
  HttpLink,
  gql
} from "@apollo/client";
let appJWTToken 
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

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/register" render={props => <Register {...props} />} />
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('root2'));
//ReactDOM.render(<div><Link to = "/login"><button>Login</button></Link></div>, document.getElementById('root2'));

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 */

