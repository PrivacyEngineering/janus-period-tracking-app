import './App.css';
import React from 'react';
import Home from './Home';
import Login from './Login';
import User from './User';
import logo from './cycle.png';
import footer from './footer.png';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import {
  ApolloClient,
  InMemoryCache,
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

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});


class App extends React.Component {

  render() {
    return (
      <ApolloProvider client={client}>
      <div className="app">
        <div className="container">
          <div className="menue">
            <Navbar bg="light" variant="light">
              <Navbar.Brand className="navBar">
                
                <h1>Welcome to Cycle</h1>
               
              </Navbar.Brand>
            </Navbar>
          </div>
          <div className="content"> </div>

          <div className="sideLine">
            <div className="sideImage">
              <img id="woman" src={logo} alt="logo" />
            </div>

          </div>

          <div className="footer">
            <img src={footer} alt="footer" />
            <img id="second" src={footer} alt="footer" />
          </div>

          
          <Switch>
            <Route exact path="/home" component={Home}  />
            <Route exact path="/login" component={Login} render={props => <Login {...props} />} />
            <Route path="/user" component={User} />
          </Switch>
         

        </div>
      </div>
     
      </ApolloProvider>
    );
  }
}

export default App;
