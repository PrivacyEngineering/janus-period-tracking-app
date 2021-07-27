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


<div className='content'>   
    <div className="login">

      <form >
        <h3>Log in</h3>

        <div className="form-group">
          <label htmlFor='username'></label>


          <input
            className="form-control"
            placeholder="Enter Username"
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={e => usernameSetValue(e.target.value)}
          />
        </div>

        <div className="form-group">
    


          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={e => passwordSetValue(e.target.value)}
          />
        </div>
        <div className="subButton">
        <button className="btn btn-dark btn-lg btn-block" onClick={() => { onSubmit ()}}>
        Login
          </button>
          </div>
          
        </form>
        <a href="/register">Register</a>
      </div>
      </div>
      
    )
  }




export default (Login);



