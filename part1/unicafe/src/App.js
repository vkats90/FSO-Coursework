import { useState } from "react";

const Display = ({ val, text }) => (
  <p>
    {text} votes: {val}
  </p>
);

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = (val) => () => setGood(val);
  const handleNeutral = (val) => () => setNeutral(val);
  const handleBad = (val) => () => setBad(val);

  return (
    <div>
      <h1>Give us some Feedback</h1>
      <Button handleClick={handleGood(good + 1)} text="Good!" />
      <Button handleClick={handleNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={handleBad(bad + 1)} text="Bad!" />
      <h2>Statistics</h2>
      <Display val={good} text="Good" />
      <Display val={neutral} text="Neutral" />
      <Display val={bad} text="Bad" />
    </div>
  );
};

export default App;
