import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/general/Button'
import Input from '../../components/general/Input'
import './auth.css'

function Login({ username, password, setUsername, setPassword }) {
  return (
    <div className="auth-body">
      <p className="auth-title">Sign in with your account</p>
      <div className="auth-fields">
        <Input
          label="Username:"
          type="text"
          value={username}
          setValue={setUsername}
          icon={faUser}
        />
        <Input
          label="Password:"
          type="password"
          value={password}
          setValue={setPassword}
          icon={faKey}
        />
        <Button label="Sign In" className="auth-submit" icon={faKey} />
      </div>
    </div>
  )
}

export default Login
