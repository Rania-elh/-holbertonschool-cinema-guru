import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Tag from './Tag'
import './movies.css'

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatchLater, setIsWatchLater] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const headers = { Authorization: `Bearer ${accessToken}` }

    axios
      .get('http://localhost:8000/api/titles/favorite/', { headers })
      .then((response) => {
        const found = response.data.some((item) => item.imdbId === movie.imdbId)
        setIsFavorite(found)
      })
      .catch((error) => {
        console.error(error)
      })

    axios
      .get('http://localhost:8000/api/titles/watchlater/', { headers })
      .then((response) => {
        const found = response.data.some((item) => item.imdbId === movie.imdbId)
        setIsWatchLater(found)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [movie.imdbId])

  const handleClick = (type) => {
    const accessToken = localStorage.getItem('accessToken')
    const headers = { Authorization: `Bearer ${accessToken}` }
    const alreadyIn = type === 'favorite' ? isFavorite : isWatchLater
    const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`

    // Déjà dans la liste : on retire. Sinon on ajoute.
    let request
    if (alreadyIn) {
      request = axios.delete(url, { headers })
    } else {
      request = axios.post(url, {}, { headers })
    }

    request
      .then(() => {
        if (type === 'favorite') {
          setIsFavorite(!alreadyIn)
        } else {
          setIsWatchLater(!alreadyIn)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img src="/images/movie.jpg" alt={movie.title} />
        <div className="movie-actions">
          {/* Étoile : ajoute le film à watch later. */}
          <FontAwesomeIcon
            icon={faStar}
            className={isWatchLater ? 'movie-icon active' : 'movie-icon'}
            onClick={() => handleClick('watchlater')}
          />
        </div>
        <h2>{movie.title}</h2>
      </div>
      <div className="movie-body">
        <p>{movie.synopsis}</p>
        <ul className="tags">
          {(movie.genres || []).map((genre) => (
            <Tag key={genre} genre={genre} filter={false} genres={[]} setGenres={() => {}} />
          ))}
        </ul>
      </div>
    </li>
  )
}

export default MovieCard
