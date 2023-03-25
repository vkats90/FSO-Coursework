const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} exercise={props.exercises[0]} />
      <Part part={props.parts[1]} exercise={props.exercises[1]} />
      <Part part={props.parts[2]} exercise={props.exercises[2]} />
    </>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.exercises.reduce((a, b) => a + b)}</p>;
};
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
