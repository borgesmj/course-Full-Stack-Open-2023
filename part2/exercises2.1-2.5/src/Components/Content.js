import React from 'react';
import Part from './Part.js';
import Total from './Total.js';

const Content = ({ content, key }) => {
  const sumTotal = content.reduce((acc, item) => acc + item.exercises, 0);

  return (
    <div id={key}>
      {content.map((item) => (
        <Part key={item.id} exercises={item.exercises} name={item.name} />
      ))}
      <Total sumTotal={sumTotal} />
    </div>
  );
};

export default Content;
