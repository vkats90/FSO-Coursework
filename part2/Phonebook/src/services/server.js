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

const replaceNumber = (id, name, number) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, { name, number })
    .then((response) => response.data)
    .catch((error) => {
      console.log("added a new number");
      addNumber(name, number);
    });
};

let serverServices = { getAll, addNumber, deleteNumber, replaceNumber };
export default serverServices;
