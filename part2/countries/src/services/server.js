import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const getAll = () => {
  return axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => response.data);
};

const getWeather = (city) => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
    )
    .then((response) => response.data);
};

const serverServices = { getAll, getWeather };

export default serverServices;
