export type Country = {
  name: { common: string; official: string }
  capital: string
  area: number
  population: number
  flags: {
    png: string
  }
  languages: { [key: string]: string }
}

export type WeatherType = {
  main: { temp: number; feels_like: number; humidity: number }
  weather: [{ main: string; icon: string }]
  wind: {
    speed: number
  }
}
