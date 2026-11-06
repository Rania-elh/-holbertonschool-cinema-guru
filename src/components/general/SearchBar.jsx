import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './general.css'

function SearchBar({ title, setTitle }) {
  const handleInput = (event) => {
    setTitle(event.target.value)
  }

  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={title}
        placeholder="Search Movies"
        onChange={handleInput}
      />
    </div>
  )
}

export default SearchBar
