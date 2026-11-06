import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../../components/movies/MovieCard'
import './dashboard.css'

function WatchLater() {
  const [movies, setMovies] = useState([
    { imdbId: 'tt2', title: 'Twice As Strong: Made of Fire', synopsis: 'Adapted for screen from the novel.', genres: ['drama'] },
  ])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    axios
      .get('http://localhost:8000/api/titles/watchlater/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setMovies(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h1>Movies to watch later</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
    </div>
  )
}

export default WatchLater
