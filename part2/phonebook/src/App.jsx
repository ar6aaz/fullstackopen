import { useEffect, useState } from 'react'
import phonebookService from './services/persons'

const Filter = ({onChange}) => {
  return(
    <>
      filter shown with: <input onChange={onChange}/>
    </>
  )
}

const PersonForm = ({onClick, onNameChange, onPhoneChange}) => {
  return(
    <>
      <form>
      <div>
        name: <input onChange={onNameChange}/>
        number: <input onChange={onPhoneChange}/>
      </div>
      <div>
        <button type="submit" onClick={onClick}>add</button>
      </div>
    </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    phonebookService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
        setPersonsToShow(contacts);
      })
  }, [])


  const Persons = ({person, deletePerson}) => {
    return(
      <>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
          <br />
      </>
    )
  }

  const handleFilter = (event) => {
    let filteredPersonsToShow = persons.filter(person => person.name.match(new RegExp(event.target.value, "i")));
    setPersonsToShow(filteredPersonsToShow);
  }

  const addNewName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone
    }
    if(persons.some(element => element.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      phonebookService
        .create(newPerson)
        .then(contact => {
          setPersons(persons.concat(contact))
          setPersonsToShow(persons.concat(contact))
      })
    }
    setNewName('');
    setNewPhone('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }


  const deletePerson = (id) => {
      const personToDelete = persons.find( person => person.id === id )
      const changedPerson = {...personToDelete}
      console.log(changedPerson)
      if(confirm(`Delete ${personToDelete.name} ?`)) {
        phonebookService
          .deletePerson(id)
          .then(changedNoteResponse => {
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToShow(persons)
        })
      }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter}/>

      <h2>Add a new</h2>
      <PersonForm 
        onClick={addNewName} 
        onNameChange={handleNameChange} 
        onPhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Persons 
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      )}
    </div>
  )
}

export default App