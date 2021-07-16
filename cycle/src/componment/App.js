import './App.css';
import React from 'react';
import Home from './Home';
import Login from './Login';
import User from './User';
import logo from './cycle.png';
import footer from './footer.png';
import {  Route, Switch } from 'react-router-dom';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'


const App = () => (
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
     
   
     
);



export default App;
