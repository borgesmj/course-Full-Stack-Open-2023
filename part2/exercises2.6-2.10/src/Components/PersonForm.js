import React from 'react';


const PersonForm = ({handleSubmit, handleNameChange, handlePhoneChange, newPhone, newName}) => {
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          Phone number: <input onChange={handlePhoneChange} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
