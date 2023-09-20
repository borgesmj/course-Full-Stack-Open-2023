import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Numbers from "./Components/Numbers";
import Message from "./Components/Message.jsx";
import axios from "axios";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const arrayNames = persons.map((item) => item.name);

  // Traer todos los nombres en db.json, sin dependencias, para que actualice
  // cada vez que haya un cambio
  useEffect(() => {
    axios.get("http://localhost:3000/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);


  // Introducir un contacto nuevo
  const handleSubmit = (event) => {
    event.preventDefault();
    // actualizar un contacto existente
    if (arrayNames.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Do you want to update the phone number?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name === newName
        );
        axios
          .put(`http://localhost:3000/persons/${existingPerson.id}`, {
            number: newPhone,
            name: newName,
          })
          .then((response) =>
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPerson.id
                  ? { ...person, number: newPhone }
                  : person
              )
            )
          )
          .catch((error) => {
            console.error("Error updating phone number:", error);
          });
        setNewName("");
        setNewPhone("");
      } else {
        setNewName("");
        setNewPhone("");
      }
    } else {
      const newObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      };
      setShowMessage(true)
      setClassName('success')
      setMessage(`Added ${newName}`)

      axios
        .post("http://localhost:3000/persons", newObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
        })
        .catch((error) => {
          console.error("Error adding a new person:", error);
        })
        .finally(() => {
            setTimeout(() => {
            setNewName("");
            setNewPhone("")
            setClassName('')
            setMessage('')
            setShowMessage(false)        
          }, 1000);
        })
    }
  };

  //Introduci nombre nuevo de contacto
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  //Introduccion de numero nuevo de contacto
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  // Formulario de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //Filtrar una busqueda de nombres
  const filteredPersons = persons.filter((person) =>
    person?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  //Borrar un numero
  const deleteNumber = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`¿Desea eliminar a ${person.name}?`)) {
      axios
      .delete(`http://localhost:3000/persons/${id}`).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting phone number:", error)
        setShowMessage(true)
        setClassName('failed')
        setMessage(`Information of ${person.name}: has already been removed from server`) 
      })
      .finally(()=>{
        setTimeout (()=>{
          window.location.reload(); 
        },1500)
      })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showMessage && <Message
        message={message}
        className={className}
      />}
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
        <Numbers key={item.id} item={item} deleteNumber={deleteNumber} />
      ))}
    </div>
  );
};

export default App;
