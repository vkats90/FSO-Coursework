import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => {
        return (
          <Part part={part.name} exercise={part.exercises} key={part.id} />
        );
      })}
    </>
  );
};
export default Content;
