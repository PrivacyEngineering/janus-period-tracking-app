import React, { useState } from 'react'
import Register from './Register';
import { graphql } from 'react-apollo';
import { gql } from '@apollo/client';
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

      <div className='content'>   
    <div className="login">

      <form onSubmit={this.onSubmit()}>
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
            onChange={e => this.onChange(e)}
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
            onChange={e => this.onChange(e)}
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
      
    );
  }
}

const mutation = gql`
mutation($username: String!, $password: String!) {
	login(username: $username, password: $password) {
    token
    refreshToken
  } 
}
`;

export default graphql(mutation)(Login);



