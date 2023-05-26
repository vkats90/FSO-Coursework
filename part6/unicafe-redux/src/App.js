const StatisticLine = ({ value, text }) => (
  <>
    <td>{text} votes</td>
    <td>{value}</td>
  </>
)

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  return good + bad + neutral ? (
    <table>
      <tr>
        <StatisticLine value={good} text="Good" />
      </tr>
      <tr>
        <StatisticLine value={neutral} text="Neutral" />
      </tr>
      <tr>
        <StatisticLine value={bad} text="Bad" />
      </tr>
      <tr>
        <StatisticLine value={good + neutral + bad} text="All" />
      </tr>
      <tr>
        <StatisticLine value={(good - bad) / (good + bad + neutral) || 0} text="Average" />
      </tr>
      <tr>
        <StatisticLine value={((good * 100) / (good + bad + neutral) || 0) + '%'} text="Positive" />
      </tr>
    </table>
  ) : (
    <p>No feedback yet!</p>
  )
}

const App = ({ store }) => {
  // save clicks of each button to its own state

  let state = store.getState()

  const handleGood = (e) => store.dispatch({ type: 'GOOD' })
  const handleNeutral = (e) => store.dispatch({ type: 'OK' })
  const handleBad = (e) => store.dispatch({ type: 'BAD' })
  const handleReset = (e) => store.dispatch({ type: 'ZERO' })

  return (
    <div>
      <h1>Give us some Feedback</h1>
      <Button handleClick={handleGood} text="Good!" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad!" />
      <Button handleClick={handleReset} text="Reset" />
      <h2>Statistics</h2>
      <Statistics good={state.good} neutral={state.ok} bad={state.bad} />
    </div>
  )
}

export default App
