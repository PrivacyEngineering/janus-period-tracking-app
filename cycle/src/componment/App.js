import './App.css';
import React from 'react';
import Home from './Home';
import Login from './Login';
import User from './User';
import logo from './cycle.png';
import footer from './footer.png';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth';
import decode from 'jwt-decode';
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

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    // { exp: 12903819203 }
    console.log(refreshToken)
    const { exp } = decode(refreshToken);
    console.log(exp)
    if (exp < new Date().getTime() / 1000) {
      return false;
    }

  } catch (e) {
    return false;
  }

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
)


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
            <AuthRoute exact path="/auth" component={Auth} />
          </Switch>
         

        </div>
      </div>
     
      </ApolloProvider>
    );
  }
}

export default App;
