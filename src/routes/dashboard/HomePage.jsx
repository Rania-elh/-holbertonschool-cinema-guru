import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/general/Button'
import Filter from '../../components/movies/Filter'
import MovieCard from '../../components/movies/MovieCard'
import './dashboard.css'

function HomePage() {
  const [movies, setMovies] = useState([
    { imdbId: 'tt1', title: 'GodHead: In a fiction, in a dream of passion', synopsis: 'Dreamers in a lonely circus.', genres: ['drama'] },
    { imdbId: 'tt2', title: 'Twice As Strong: Made of Fire', synopsis: 'Adapted for screen from the novel.', genres: ['drama'] },
    { imdbId: 'tt3', title: 'Equally Friends', synopsis: 'A outsider comes to town and meets three people.', genres: ['biography', 'comedy', 'drama'] },
  ])
  const [minYear, setMinYear] = useState(1970)
  const [maxYear, setMaxYear] = useState(2022)
  const [genres, setGenres] = useState([])
  const [sort, setSort] = useState('')
  const [title, setTitle] = useState('')
  const [page, setPage] = useState(1)

  // pageNumber dit à l'API combien de pages ramener (50 films par page).
  const loadMovies = (pageNumber) => {
    const accessToken = localStorage.getItem('accessToken')

    axios
      .get('http://localhost:8000/api/titles/advancedsearch', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          minYear,
          maxYear,
          genres: genres.join(','),
          title,
          sort,
          page: pageNumber,
        },
      })
      .then((response) => {
        setMovies(response.data.titles)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Au montage, et à chaque changement de filtre ou de tri.
  useEffect(() => {
    setPage(1)
    loadMovies(1)
  }, [minYear, maxYear, genres, sort, title])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadMovies(nextPage)
  }

  return (
    <div>
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
      <Button className="load-more" label="Load More.." onClick={loadMore} />
    </div>
  )
}

export default HomePage
