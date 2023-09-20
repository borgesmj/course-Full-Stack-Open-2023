import React from 'react';

const Part = ({ index, exercises, name }) => {
  return (
    <div>
      <p key={index}>
        {name}: {exercises}
      </p>
    </div>
  );
};

export default Part;
