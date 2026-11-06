import Input from '../general/Input'
import SearchBar from '../general/SearchBar'
import SelectInput from '../general/SelectInput'
import Tag from './Tag'
import './movies.css'

const genreList = [
  'action',
  'drama',
  'comedy',
  'biography',
  'romance',
  'thriller',
  'war',
  'history',
  'sport',
  'sci-fi',
  'documentary',
  'crime',
  'fantasy',
]

function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) {
  return (
    <div className="filter">
      <div className="filter-main">
        <SearchBar title={title} setTitle={setTitle} />
        <div className="filter-row">
          <Input label="Min Date" type="number" value={minYear} setValue={setMinYear} />
          <Input label="Max Date" type="number" value={maxYear} setValue={setMaxYear} />
          <SelectInput
            label="Sort"
            value={sort}
            setValue={setSort}
            options={['', 'latest', 'oldest', 'highestrated', 'lowestrated']}
          />
        </div>
      </div>
      <ul className="tags">
        {genreList.map((genre) => (
          <Tag
            key={genre}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  )
}

export default Filter
