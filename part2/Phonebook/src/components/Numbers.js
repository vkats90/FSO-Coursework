import serverServices from "../services/server";

const Numbers = ({ persons, filter }) => {
  const handleClick = (id) => () => {
    if (window.confirm("Are you sure you want to delete this number?"))
      serverServices.deleteNumber(id);
  };
  return (
    <div>
      {persons
        .filter((person) => RegExp(filter, "ig").test(person.name))
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={handleClick(person.id)}>delete</button>
          </div>
        ))}{" "}
    </div>
  );
};

export default Numbers;
