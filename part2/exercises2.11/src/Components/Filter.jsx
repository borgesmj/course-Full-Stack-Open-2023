import React, { useState } from 'react';

const Filter = ({ handleSearchChange, searchTerm }) => {
  return (
    <div>
      <div>
        Filter shown with:{' '}
        <input onChange={handleSearchChange} value={searchTerm} />
      </div>
    </div>
  );
};

export default Filter;
