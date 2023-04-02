import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Input from "./components/Input";
import Numbers from "./components/Numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newNumber || !newName) {
      alert("Input both name and number");
    } else if (
      persons.filter((person) => person.name === newName).length !== 0
    ) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Input
        value={filter}
        handleChange={handleFilterChange}
        text="Filter by name"
      />
      <h2>Add a new phonenumber</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} />
    </div>
  );
};

export default App;
