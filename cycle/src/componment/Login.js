import React, { useState } from 'react';
import './login.css';
import { gql, useMutation } from '@apollo/client';
import jwtDecode from "jwt-decode";

const LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
	login(username: $username, password: $password) {
    token
  } 
}
`;

const Login =  () => {
  // Sets a state variable to save the current inputValue
  const [inputVal, setValue] = useState(" ");
  const [password, passwordSetValue] = useState(" ");
  
  const [login, {data: dataA}] = useMutation(LOGIN, { variables: { username: inputVal, password : password}});
  
  const onSubmit = async () => {
    try {
      await login();
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
        <h2>User Page</h2>

        <div className="btnContainer">
          <input placeholder="Enter ID" onChange={e => setValue(e.target.value)} />
          <input placeholder="Enter ID" onChange={e => passwordSetValue(e.target.value)} />
          <button onClick={(e) => {e.preventDefault();onSubmit(); onSubmit()}}>
            Get user data by ID.
          </button>
          <pre>
            {JSON.stringify(dataA, null, "  ")}
          </pre>
        </div>

       

       
      </div>
    </div>
    
  );
}

export default Login;