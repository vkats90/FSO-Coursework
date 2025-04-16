import './app.css'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import CountryList from './components/List'
import { Country } from '../types'
import { getAll } from '../server/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState<Country[]>([])

  useEffect(() => {
    getAll().then((res) => setCountries(res))
  }, [])

  return (
    <div id="main">
      <Search countries={countries} setDisplay={setDisplay} />
      <CountryList display={display} />
    </div>
  )
}

export default App
