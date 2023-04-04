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

const deleteNumber = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => response.data)
    .catch((error) => alert("This number has already been deleted"));
};

let serverServices = { getAll, addNumber, deleteNumber };
export default serverServices;
