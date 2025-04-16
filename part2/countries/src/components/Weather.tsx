import { useEffect, useState } from 'react'
import { WeatherType } from '../../types'
import { getWeather } from '../../server/weather'

const Weather = ({ name }: { name: string }) => {
  const [weather, setWeather] = useState<WeatherType | null>(null)

  useEffect(() => {
    getWeather(name).then((res) => setWeather(res))
  }, [])

  if (!weather) return
  return (
    <div>
      <h2>Weather in {name}</h2>
      <h3>{weather.weather[0].main}</h3>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>Temprature:{weather.main.temp}°</p>
      <p>Feels like:{weather.main.feels_like}°</p>
      <p>Humidity:{weather.main.humidity}</p>
      <p>Wind:{weather.wind.speed}km/hr</p>
    </div>
  )
}

export default Weather
