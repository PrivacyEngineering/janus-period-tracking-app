import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom"


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
reportWebVitals();
