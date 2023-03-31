const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises
      </strong>
    </p>
  );
};

export default Total;
