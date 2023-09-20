import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={handleGoodClick} />
      <Button text="Neutral" handleClick={handleNeutralClick} />
      <Button text="Bad" handleClick={handleBadClick} />

      {good === 0 && neutral === 0 && bad === 0 ? (
        'No feedback given'
      ) : (
        <Statistics good={good} bad={bad} neutral={neutral} />
      )}
      <Comments />
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  let sum = good + bad + neutral;
  let positive = (good / sum) * 100;
  let average = (good * 1 + neutral * 0 + bad * -1) / sum;
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <Average text="Sum" value={sum} />
          <Average text="Positive" value={positive} percent="%" />
          <Average text="Average" value={average} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Average = ({ text, value, percent }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {percent}
      </td>
    </tr>
  );
};

const Comments = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [index, setIndex] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleNextQuote = () => {
    setIndex(Math.floor(Math.random() * anecdotes.length));
  };

  let maxPoints = 0;
  for (let i = 0; i < points.length; i++) {
    if (points[i] > maxPoints) {
      maxPoints = points[i];
    }
  }

  let maxIndex = points.indexOf(maxPoints);

  const handleVote = () => {
    const newPoints = [...points];
    console.log(newPoints);
    newPoints[index] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <p>{anecdotes[index]}</p>
      <button onClick={handleNextQuote}>Next anecdote</button>
      <p>Votes:{points[index]}</p>
      <button onClick={handleVote}>Vote</button>
      <h3>Anecdote with more votes</h3>
      <p>{anecdotes[maxIndex]}</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
