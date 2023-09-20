import React from 'react';

const Numbers = ({ index, item }) => {

  return (
    <div>
      <div key={index}>
        {item.name} {item.phone}
      </div>
    </div>
  );
};

export default Numbers;
