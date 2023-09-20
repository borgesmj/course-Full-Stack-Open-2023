import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item, index) => (
        <p key={index}>
          {item.name} {item.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((total, item) => total + item.exercises, 0);
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
