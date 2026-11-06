import { useState } from 'react'
import './movies.css'

function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(genres.includes(genre))

  const handleTag = () => {
    // Sur une carte, le tag est juste affiché. On ne change la liste que dans le filtre.
    if (!filter) {
      return
    }

    if (selected) {
      setGenres(genres.filter((item) => item !== genre))
      setSelected(false)
    } else {
      setGenres([...genres, genre])
      setSelected(true)
    }
  }

  const label = genre === 'sci-fi' ? 'Sci-Fi' : genre.charAt(0).toUpperCase() + genre.slice(1)

  return (
    <li
      className={`tag ${selected || !filter ? 'selected' : ''}`}
      onClick={handleTag}
    >
      {label}
    </li>
  )
}

export default Tag
