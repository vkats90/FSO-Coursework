import { Country } from '../../types'
import { useState, useEffect } from 'react'
import SingleCountry from './Country'

const CountryList = ({ display }: { display: Country[] }) => {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    setIndex(null)
  }, [display])

  const handleShow = (num: number) => {
    setIndex(num)
  }

  if (display.length > 10) return <p>Too many matches, specify a different filte</p>
  else if (display.length == 1) return <SingleCountry name={display[0].name.common} />
  return (
    <ul>
      {display.map((x, i) =>
        index != i ? (
          <li className="lineItem" key={'country' + i} onClick={() => handleShow(i)}>
            {x.name.common}
          </li>
        ) : (
          <SingleCountry key={'country' + i} name={display[i].name.common} />
        )
      )}
    </ul>
  )
}

export default CountryList
