import { useState } from "react";

const Anecdote = ({ anecdote }: { anecdote: string }) => {
  return <p>{anecdote}</p>;
};

const Buttons = ({
  vote,
  selectRandom,
}: {
  vote: () => void;
  selectRandom: () => void;
}) => {
  return (
    <span>
      <button onClick={vote}>Vote</button>
      <button onClick={selectRandom}>Next Anecdote</button>
    </span>
  );
};

const App = () => {
  const anecdotes: string[] = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState<number[]>(Array(anecdotes.length).fill(0));
  const [highestVoted, setHighestVoted] = useState(0);

  const randomize = (number: number) => {
    let generated;
    do {
      generated = Math.floor(Math.random() * number);
    } while (generated == selected);
    return generated;
  };

  const vote = () => {
    const temp = votes;
    temp[selected] += 1;
    setVotes(temp);
    setHighestVoted(temp.indexOf(Math.max(...votes)));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <Buttons vote={vote} selectRandom={() => setSelected(randomize(8))} />
      <h1>Heghest voted Anecdote:</h1>
      <Anecdote anecdote={anecdotes[highestVoted]} />
    </div>
  );
};

export default App;
