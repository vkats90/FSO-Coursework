import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good * 100) / all + "%";
  if (all == 0)
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback to display yet</p>
      </div>
    );

  return (
    <table>
      <thead>
        <tr>
          <td>
            <h1>Statistics</h1>
          </td>
        </tr>
      </thead>

      <tbody>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={all} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive"} value={positive} />
      </tbody>
    </table>
  );
};

const Button = ({ text, cbFunc }) => {
  const handleAdd = (cbFunc) => () => {
    cbFunc((prev) => prev + 1);
  };

  return <button onClick={handleAdd(cbFunc)}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <span>
        <Button text={"Good"} cbFunc={setGood} />
        <Button text={"Neutral"} cbFunc={setNeutral} />
        <Button text={"Bad"} cbFunc={setBad} />
      </span>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
