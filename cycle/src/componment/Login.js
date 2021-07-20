import React, { useState } from 'react'
import Register from './Register';
import { graphql } from 'react-apollo';
import { gql, useMutation } from '@apollo/client';
import { Button, Input, Checkbox } from 'antd';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });
    const {token, refreshToken} = response.data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', token);
    console.log(response);

  }

  onSubmit={handleSubmit()}*/


    return (


<div className='content'>
    <div className="login">

      <form >
        <h3>Log in</h3>

        <div className="form-group">
          <label htmlFor='username'></label>

      <div className='login'>
        <form>
          <label htmlFor='username'>Login</label>

          <input
            type='text'
            id='username'
            name='username'
            value={state.username}

          />
        </div>

        <div className="form-group">

          <input
            type='password'
            id='password'
            name='password'
            value={state.password}

          />

          <Button onClick={() => this.onSubmit()} type="primary">Login</Button>

          {<p className='error'>Error</p>}
        </form>
        <a href="/register">Register</a>
      </div>
      )}
          }

const mutation = gql`

mutation LoginMutation($username: String!, $passwordHash: String) {

const mutation = gql`
mutation($username: String!, $password: String!) {
	login(username: $username, password: $password) {
    token
    refreshToken
  }
}
`;   graphql(mutation)*/

export default (Login);
