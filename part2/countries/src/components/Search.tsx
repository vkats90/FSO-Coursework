import { Country } from '../../types'
import { useState } from 'react'

interface PropTypes {
  countries: Country[]
  setDisplay: React.Dispatch<React.SetStateAction<Country[]>>
}

const Search = ({ countries, setDisplay }: PropTypes) => {
  const [search, setSearch] = useState('')

  const handleChange = (value: string) => {
    setSearch(value)

    if (!value) setDisplay([])
    else
      setDisplay(
        countries.filter(
          ({ name }) =>
            name.common.toLowerCase().includes(value) || name.official.toLowerCase().includes(value)
        )
      )
  }

  return (
    <div className="search">
      <input
        value={search}
        placeholder="Find Country"
        onChange={({ target }) => handleChange(target.value)}
      />
    </div>
  )
}

export default Search
