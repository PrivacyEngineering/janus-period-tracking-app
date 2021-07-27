<<<<<<< Updated upstream
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
=======
import React, { useState } from 'react';
//import { graphql } from 'react-apollo';
import './login.css';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

function Login({ props }) {
  const history = useHistory();
  const [username, usernameSetValue] = useState("szuboff");
  const [password, passwordSetValue] = useState(" ");
  console.log(username)
  const LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
	login(username: $username, password: $password) {
    token
  } 
}
`;

const test = gql`
  mutation test{
	  test {
      token
  } 
}
`;
  
    const [login] = useMutation(LOGIN, { variables: { username, password } });
    //const [login, error, data] = useMutation(test);
    
  function onSubmit (){
    const token = " "
    const response = login()
    localStorage.setItem('token', login.token);
    history.push('/');
    

  }
  
  return (
>>>>>>> Stashed changes

  onSubmit={handleSubmit()}*/


    return (


<div className='content'>
    <div className="login">

<<<<<<< Updated upstream
      <form >
=======
      <form>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            value={state.username}

=======
            value={username}
            onChange={e => usernameSetValue(e.target.value)}
>>>>>>> Stashed changes
          />
        </div>

        <div className="form-group">

          <input
            type='password'
            id='password'
            name='password'
<<<<<<< Updated upstream
            value={state.password}

          />

          <Button onClick={() => this.onSubmit()} type="primary">Login</Button>
=======
            value={password}
            onChange={e => passwordSetValue(e.target.value)}
          />
        </div>
        <div className="subButton">
        <button className="btn btn-dark btn-lg btn-block" onClick={() => { onSubmit ()}}>
        Login
          </button>
          </div>
        
>>>>>>> Stashed changes

          {<p className='error'>Error</p>}
        </form>
        <a href="/register">Register</a>
      </div>
<<<<<<< Updated upstream
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
=======
      </div>
      
    );
  }




export default (Login);




>>>>>>> Stashed changes

export default (Login);
