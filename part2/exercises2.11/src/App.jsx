import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter.jsx';
import PersonForm from './Components/PersonForm.jsx';
import Numbers from './Components/Numbers';
import axios from 'axios';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const arrayNames = persons.map((item) => item.name);

  useEffect(() => {
    axios
      .get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    if (arrayNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      setNewPhone('');
    } else {
      const newObject = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1
      };
      setPersons(persons.concat(newObject));
      setNewName('');
      setNewPhone('');
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <h3>Add new phone</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newPhone={newPhone}
        newName={newName}
      />

      <h2>Numbers</h2>
      {filteredPersons.map((item) => (
          <Numbers
            key={item.id} // Move the 'key' prop directly to the Numbers component
            item={item}
          />
      ))}
    </div>
  );
};

export default App;
