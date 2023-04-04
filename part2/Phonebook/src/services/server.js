import axios from "axios";

const getAll = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const addNumber = (name, number) => {
  return axios
    .post("http://localhost:3001/persons", { name, number })
    .then((response) => response.data);
};

let serverServices = { getAll, addNumber };
export default serverServices;
