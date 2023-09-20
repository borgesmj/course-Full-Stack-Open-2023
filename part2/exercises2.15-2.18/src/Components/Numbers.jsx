import React from 'react';
import DeleteBtn from './DeleteBtn';

const Numbers = ({ item, deleteNumber }) => {
  return (
    <div>
      <p>
        {item.name} {item.number} <DeleteBtn deleteNumber={deleteNumber} id = {item.id} />

      </p>
    </div>
  );
};

export default Numbers;
