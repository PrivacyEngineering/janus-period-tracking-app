import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { login, getCurrentPath } from './utils/auth'
import { withHostname } from './utils/ctxWrapper'
import {graphql } from 'react-apollo'
import Register from './Register';

const { gql } = require('apollo-client')

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }


  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    const {token, refreshToken} = response.data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', token);
    console.log(response);
  }
  render() {
  return (

      <div className='login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Login</label>

          <input
            type='text'
            id='username'
            name='username'
            value={userData.username}
            onChange={event =>
              setUserData({
                ...userData,
                username: event.target.value
              })
            }
          />
          <input
            type='password'
            id='password'
            name='password'
            value={userData.password}
            onChange={event =>
              setUserData({
                ...userData,
                password: event.target.value
              })
            }
          />

          <button type='submit'>Login</button>

          {userData.error && <p className='error'>Error: {userData.error}</p>}
        </form>
        <a href="/register">Register</a>
      </div>
      )}
          }


const mutation = gql`
mutation($username: String!, $passwordHash: String) {
	login(username: $username, password: $password) {
    token
    refresToken
  } 
}
`;

export default graphql(mutation)(Login);
