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
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to update the phone number?`)) {
        const existingPerson = persons.find((person) => (
          person.name === newName
        ));
        axios
          .put(`http://localhost:3000/persons/${existingPerson.id}`, {number : newPhone})
          .then((response) => (
            setPersons((prevPersons) => 
              prevPersons.map((person) =>
                person.id === existingPerson.id ? {...person, number: newPhone} : person
              )
            )
          ))
          .catch((error) => {
            console.error('Error updating phone number:', error);
          });
            setNewName('')
            setNewPhone('')
      } else {
        setNewName('');
        setNewPhone('');
      }
    } else {
      const newObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1
      };
  
      axios
        .post('http://localhost:3000/persons', newObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewPhone('');
        })
        .catch((error) => {
          console.error('Error adding a new person:', error);
        });
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
  person?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
);


  const deleteNumber = (id) => {
    const person = persons.find((person) => person.id === id);
  
    if (window.confirm(`¿Desea eliminar a ${person.name}?`)) {
      axios
        .delete(`http://localhost:3000/persons/${id}`)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  

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
            key={item.id} 
            item={item}
            deleteNumber = {deleteNumber}
          />
      ))}
    </div>
  );
};

export default App;
