import { useEffect, useState } from 'react'
import axios from 'axios'
import Authentication from './routes/auth/Authentication'
import Dashboard from './routes/dashboard/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userUsername, setUserUsername] = useState('Atef')

  // Au chargement, on regarde si un token est déjà enregistré.
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      return
    }

    axios
      .post('http://localhost:8000/api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true)
        setUserUsername(response.data.username)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Authentication
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUserUsername}
        />
      )}
    </div>
  )
}

export default App
