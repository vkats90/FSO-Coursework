import Input from "./Input";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input value={newName} handleChange={handleNameChange} text="Name" />
      <Input
        value={newNumber}
        handleChange={handleNumberChange}
        text="Number"
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
