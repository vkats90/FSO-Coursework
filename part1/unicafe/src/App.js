import { useState } from "react";

const StatisticLine = ({ value, text }) => (
  <p>
    {text} votes: {value}
  </p>
);

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  return good + bad + neutral ? (
    <div>
      <StatisticLine value={good} text="Good" />
      <StatisticLine value={neutral} text="Neutral" />
      <StatisticLine value={bad} text="Bad" />
      <StatisticLine value={good + neutral + bad} text="All" />
      <StatisticLine
        value={(good - bad) / (good + bad + neutral) || 0}
        text="Average"
      />
      <StatisticLine
        value={((good * 100) / (good + bad + neutral) || 0) + "%"}
        text="Positive"
      />
    </div>
  ) : (
    <p>No feedback yet!</p>
  );
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
