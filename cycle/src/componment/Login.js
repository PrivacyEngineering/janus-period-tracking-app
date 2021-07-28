import React, { useState } from 'react';
import './login.css';
import { gql, useMutation } from '@apollo/client';
import jwtDecode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
	login(username: $username, password: $password) {
    token
  } 
}
`;

const Login =  () => {
  // Sets a state variable to save the current inputValue
  const [username, setValue] = useState(" ");
  const [password, passwordSetValue] = useState(" ");
  
  const [login, {data: dataA, error: error}] = useMutation(LOGIN, { variables: { username: username, password : password}});
  const history = useHistory();

  const redirect = () => {
    history.push('/user')
  }

  const onSubmit = async () => {
    try {
      console.log(dataA);
      await login();
      console.log(dataA);
      console.log(error);

      const { token } = dataA.login;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", token);
      console.log("login worked!");
      console.log(jwtDecode(token));
    } catch (e) {
      console.log("login failed!");
      console.log(e);
    }
  };


  return (
    <div className="content">
      <div className="userPage">
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor='username'></label>
          <input
            className="form-control"
            placeholder="Enter Username"
            type='text'
            id='username'
            name='username'
            onChange={e => setValue(e.target.value)}
          />
          <div className="form-group">
    


          <input
            type='password'
            className="form-control"
            placeholder="Enter Password"
            id='password'
            name='password'
            onChange={e => passwordSetValue(e.target.value)}
          />
        </div>

        <div className="subButton">
          
          <button className="btn btn-dark btn-lg btn-block" onClick={(e) => {e.preventDefault();onSubmit(); }}>
          Login
            </button>
         </div>
         <a href="/register">Register</a>
        </div>

       

       
      </div>
    </div>
    
  );
}

export default Login;