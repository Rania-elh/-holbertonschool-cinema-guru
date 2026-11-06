import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './navigation.css'

function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false)
  }

  return (
    <nav className="header">
      <p className="header-logo">Cinema Guru</p>
      <div className="header-user">
        <img src="/images/avatar.jpg" alt="avatar" />
        <p>Welcome, {userUsername} !</p>
        <span className="logout" onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Logout
        </span>
      </div>
    </nav>
  )
}

export default Header
