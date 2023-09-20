import React from 'react'

const DeleteBtn = ({deleteNumber, id}) => {
    const handleClick = () => {
        deleteNumber(id);
      }
      
  return (
    <button
        onClick={handleClick}
    >
      delete
    </button>
  )
}

export default DeleteBtn
