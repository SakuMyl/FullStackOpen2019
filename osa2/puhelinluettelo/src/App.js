import React, { useState } from 'react'

const Header = ({name}) => (
  <h2>{name}</h2>
)
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewName = (event) => {
    event.preventDefault()
    console.log(persons.concat(newName))
    const person = {
      name: newName
    }
    if(persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(person))
    }
  } 
  const names = () => (
    persons.map(person => <p key={person.name}>{person.name}</p>)
  )
  return (
    <div>
      <Header name='Puhelinluettelo'></Header>
      <form onSubmit = {handleNewName}>
        <div>
          nimi: <input 
            value = {newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {names()}
    </div>
  )

}

export default App