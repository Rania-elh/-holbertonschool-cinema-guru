import { useState } from 'react'
import axios from 'axios'
import Button from '../../components/general/Button'
import Login from './Login'
import Register from './Register'
import './auth.css'

function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, setSwitch] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const showLogin = (event) => {
    event.preventDefault()
    setSwitch(true)
  }

  const showRegister = (event) => {
    event.preventDefault()
    setSwitch(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // true = connexion, false = inscription
    const url = _switch
      ? 'http://localhost:8000/api/auth/login'
      : 'http://localhost:8000/api/auth/register'

    axios
      .post(url, { username, password })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken)
        setUserUsername(username)
        setIsLoggedIn(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-switch">
        <Button
          label="Sign In"
          className={_switch ? 'active' : ''}
          onClick={showLogin}
        />
        <Button
          label="Sign Up"
          className={!_switch ? 'active' : ''}
          onClick={showRegister}
        />
      </div>
      {_switch ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <Register
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </form>
  )
}

export default Authentication
