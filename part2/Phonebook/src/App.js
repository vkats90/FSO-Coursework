import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Input from "./components/Input";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";
import serverServices from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState("darkgreen");

  useEffect(() => {
    serverServices.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
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
    //checking if fields are empty
    if (!newNumber || !newName) {
      alert("Input both name and number");
      //checking if the name is already there
    } else if (
      persons.filter((person) => person.name === newName).length !== 0
    ) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace old number with the new one?`
        )
      ) {
        serverServices
          .replaceNumber(
            persons.find((person) => person.name === newName).id,
            newName,
            newNumber
          )
          .catch((error) => {
            setColor("red");
            setMessage(`${newName} was previously deleted`);
            setPersons(persons.filter((person) => person !== newName));
            setTimeout(() => setMessage(null), 5000);
          });
      }
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      serverServices.addNumber(newName, newNumber);
      setColor("darkgreen");
      setMessage(`${newName} was added!`);
      setTimeout(() => setMessage(null), 5000);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color} />
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
