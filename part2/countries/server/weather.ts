const apiKey = import.meta.env.VITE_WEATHER_KEY

import axios from 'axios'

export const getWeather = (city: string) => {
  return axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then((response) => response.data)
    .catch((err) => console.log('error', err))
}
