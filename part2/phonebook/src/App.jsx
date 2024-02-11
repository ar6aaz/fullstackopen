import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: '9999999999'
   }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      phone: newPhone
    }
    if(persons.some(element => element.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
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
      <form>
        <div>
          name: <input onChange={handleNameChange}/>
          number: <input onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <p id={person.name}>{person.name} {person.phone}</p>
        )}  
      </div>
    </div>
  )
}

export default App