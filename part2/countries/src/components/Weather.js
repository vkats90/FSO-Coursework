import { useState, useEffect } from "react";
import serverServices from "../services/server";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    serverServices.getWeather(city).then((data) => {
      setWeather(data);
    });
  }, []);
  return weather ? (
    <>
      <h2>Weather in {city}</h2>
      <p>Temprature:{(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        width="150px"
      ></img>
      <p>Wind: {weather.wind.speed.toFixed(2)} m/s</p>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Weather;
