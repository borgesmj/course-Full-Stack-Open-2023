import React from 'react';

const Numbers = ({ item }) => {
  return (
    <div>
      <p>
        {item.name} {item.number}
      </p>
    </div>
  );
};

export default Numbers;
