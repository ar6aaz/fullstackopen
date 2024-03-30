import { useEffect, useState } from 'react'
import phonebookService from './services/persons'
import Notification from './components/Notification'

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
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      if(confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const element = persons.filter(element => element.name === newName)
          phonebookService
            .put(newPerson, element[0].id)
            .then(contact => {
              setPersons(persons.concat(contact))
              setPersonsToShow(persons.concat(contact))
              setMessage(`Phone number of existing contact ${element[0].name} updated`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)})
              .catch( error => {
                console.log('setting error msg')
                setErrorMessage(`${newName} was already deleted from phonebook`)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(p => p.id !== id))
              }

              )
      }
    }
    else{
      phonebookService
        .create(newPerson)
        .then(contact => {
          setPersons(persons.concat(contact))
          setPersonsToShow(persons.concat(contact))
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setNewName('');
    setNewPhone('');
    setMessage(`Added new contact ${newPerson.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
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
          setPersonsToShow(persons.filter(person => person.id !== id))
        })
      }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage}/>
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
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      )}
    </div>
  )

}
export default App