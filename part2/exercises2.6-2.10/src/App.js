import React, { useState } from 'react';
import Filter from './Components/Filter.js';
import PersonForm from './Components/PersonForm.js';
import Numbers from './Components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const arrayNames = persons.map((item) => item.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (arrayNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
    } else {
      const newObject = {
        name: newName,
        phone: newPhone,
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
      {filteredPersons.map((item, index) => (
        <Numbers item={item} index={index} />
      ))}
    </div>
  );
};

export default App;
