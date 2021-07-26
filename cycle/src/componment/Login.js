import React, { useState } from 'react'
import {graphql } from 'react-apollo'
import Register from './Register';
import './login.css';
import { gql } from '@apollo/client';

function Login({ props }) {

  const state = {
    username: '',
    password: '',
  }


  function handleSubmit (){
    const response = props.mutate({
      variables: state
    });
    const {token, refreshToken} = response.data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', token);
    console.log(response);

  }
  
    
    

  

 
    return (
  

<div className='content'>   
    <div className="login">

      <form onSubmit={handleSubmit()}>
        <h3>Log in</h3>

        <div className="form-group">
          <label htmlFor='username'></label>


          <input
            className="form-control"
            placeholder="Enter Username"
            type='text'
            id='username'
            name='username'
            value={this.state.username}
          
          />
        </div>

        <div className="form-group">

  

          <input
            className="form-control"
            placeholder="Enter password"
            type='password'
            id='password'
            name='password'
            value={this.state.password}
          
          />
        </div>

        <div className="subButton">
        <button type='submit' className="btn btn-dark btn-lg btn-block">Login</button>
        </div>

        {/* {userData.error && <p className='error'>Error</p>} */}
      </form>
      <a href="/register">Register</a>
    </div>
    </div>
    
  )
}

const mutation = gql`

mutation LoginMutation($username: String!, $passwordHash: String) {

	login(username: $username, password: $password) {
    token
    refreshToken
  } 
}
`;  

export default graphql(mutation)(Login);

