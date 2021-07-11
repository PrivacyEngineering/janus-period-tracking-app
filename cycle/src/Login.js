import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { login, getCurrentPath } from './utils/auth'
import { withHostname } from './utils/ctxWrapper'
import Register from './Register';


function Login ({ hostname }) {
  const [userData, setUserData] = useState({ username: '', password: '', error: '' })

  async function handleSubmit (event) {
    event.preventDefault()
    setUserData({
      ...userData,
      error: ''
    })


    const { username, password } = userData
    const url = `${hostname}/login`

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 200) {
        const { jwt_token, jwt_token_expiry } = await response.json()
        await login({ jwt_token, jwt_token_expiry })
      } else {
        console.log('Login failed.')
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

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
export default withHostname(Login)
