import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../../components/movies/MovieCard'
import './dashboard.css'

function Favorites() {
  const [movies, setMovies] = useState([
    { imdbId: 'tt1', title: 'GodHead: In a fiction, in a dream of passion', synopsis: 'Dreamers in a lonely circus.', genres: ['drama'] },
    { imdbId: 'tt3', title: 'Equally Friends', synopsis: 'A outsider comes to town and meets three people.', genres: ['biography', 'comedy', 'drama'] },
  ])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    axios
      .get('http://localhost:8000/api/titles/favorite/', {
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
      <h1>Movies you like</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
    </div>
  )
}

export default Favorites
