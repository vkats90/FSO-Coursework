const Numbers = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter((person) => RegExp(filter, "ig").test(person.name))
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}{" "}
    </div>
  );
};

export default Numbers;
