import { useEffect, useState } from 'react'
import { Country } from '../../types'
import { getOne } from '../../server/countries'
import Weather from './Weather'

const SingleCountry = ({ name }: { name: string }) => {
  const [country, setCountry] = useState<Country | null>(null)

  useEffect(() => {
    getOne(name).then((res) => setCountry(res))
  }, [])

  if (!country) return
  return (
    <div className="singleCountry">
      <h1>{country.name.common}</h1>
      <p>Capital:{country.capital}</p>
      <p>Area:{country.area} sqkm</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((x, i) => (
          <li key={'lang' + i}>{x}</li>
        ))}
      </ul>
      <h2>Flag:</h2>
      <img src={country.flags.png} />
      <Weather name={country.capital} />
    </div>
  )
}

export default SingleCountry
