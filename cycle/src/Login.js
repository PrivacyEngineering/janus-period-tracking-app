import React, { useState } from 'react'
import Register from './Register';
import { gql, graphql } from 'react-apollo';
//import { gql, useMutation } from '@apollo/client';


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
  render() {
  return (

      <div className='login'>
        <form onSubmit={this.handleSubmit()}>
          <label htmlFor='username'>Login</label>

          <input
            type='text'
            id='username'
            name='username'
            value={this.state.username}
            onChange={e => this.onChange(e)
            }
          />
          <input
            type='password'
            id='password'
            name='password'
            value={this.state.password}
            onChange={e => this.onChange(e)
            }
          />

          <button type='submit'>Login</button>

          {<p className='error'>Error</p>}
        </form>
        <a href="/register">Register</a>
      </div>
      )}
          }


const mutation = gql`
mutation($username: String!, $passwordHash: String) {
	login(username: $username, password: $password) {
    token
    refreshToken
  } 
}
`;

export default graphql(mutation)(Login);
