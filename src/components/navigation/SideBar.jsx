import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faClock,
  faFolder,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import Activity from '../Activity'
import './navigation.css'

const pages = [
  { name: 'Home', icon: faFolder },
  { name: 'Favorites', icon: faStar },
  { name: 'Watch Later', icon: faClock },
]

function SideBar() {
  const [selected, setSelected] = useState('home')
  const [small, setSmall] = useState(true)
  const [activities, setActivities] = useState([])
  const [showActivities, setShowActivities] = useState(false)
  const navigate = useNavigate()

  const setPage = (pageName) => {
    setSelected(pageName)

    if (pageName === 'Home') {
      navigate('/home')
    } else if (pageName === 'Favorites') {
      navigate('/favorites')
    } else if (pageName === 'Watch Later') {
      navigate('/watchlater')
    }
  }

  const toggleSidebar = () => {
    setSmall((value) => !value)
    setShowActivities((value) => !value)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    axios
      .get('http://localhost:8000/api/activity', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setActivities(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <nav className={small ? 'sidebar small' : 'sidebar'}>
      <ul className="sidebar-nav">
        {pages.map((page) => (
          <li
            key={page.name}
            className={selected.toLowerCase() === page.name.toLowerCase() ? 'selected' : ''}
            onClick={() => setPage(page.name)}
          >
            <FontAwesomeIcon icon={page.icon} />
            {!small && <span>{page.name}</span>}
          </li>
        ))}
      </ul>
      <button type="button" className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={small ? faChevronRight : faChevronLeft} />
      </button>
      {showActivities && (
        <div className="activities-box">
          <p className="activities-title">Latest Activities</p>
          <ul className="activities">
            {activities.slice(0, 10).map((activity) => (
              <Activity key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default SideBar
