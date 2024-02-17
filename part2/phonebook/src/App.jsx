import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons);

  const Persons = ({personsToShow}) => {
    return(
      <>
        {personsToShow.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
      </>
    )
  }

  const handleFilter = (event) => {
    console.log("Event: ", event)
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
      setPersons(persons.concat(newPerson))
      setPersonsToShow(persons);
    }
    setNewName('');
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm onClick={addNewName} onNameChange={handleNameChange} onPhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App