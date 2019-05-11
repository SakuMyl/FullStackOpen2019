import React, { useState, useEffect } from 'react'
import {getAll, create} from './AxiosUtils'

const Header = ({name}) => (
  <h1>{name}</h1>
)
const Filter = (props) => {
  return (
    <div>
      Rajaa näytettäviä: <input
        value = {props.constraint}
        onChange = {props.handleChange}
      />
    </div>
  )
}
const NewPersonForm = (props) => {
  return(
    <div>
      <h2>Lisää uusi</h2>
      <form onSubmit = {props.handleSubmit}>
        <div>
          nimi: <input 
            value = {props.name}
            onChange={props.handleNameChange}
            />
        </div>
        <div>
          numero: <input
          value = {props.number}
          onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}
const Persons = ({persons}) => {
  return(
    <div>
      <h2>Numerot</h2>
      {persons}
    </div>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [newConstraint, setNewConstraint] = useState('')

  useEffect(() => {
    getAll()
      .then(response => setPersons(response))
  }, [])
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleConstraintChange = (event) => {
    console.log(event.target.value)
    setNewConstraint(event.target.value)
  }
  const handleNewPerson = (event) => {
    event.preventDefault()
    console.log(persons.concat(newName))
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      create(person)
      setPersons(persons.concat(person))
    }
  } 
  const joinNameAndNumber = (person) => (
    `${person.name.toLowerCase()} ${person.number}`
  )
  const filterPersons = () => (
    persons.filter(person => joinNameAndNumber(person).includes(newConstraint.toLowerCase()))
           .map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
  return (
    <div>
      <Header name='Puhelinluettelo'></Header>
      <Filter
        constraint={newConstraint}
        handleChange={handleConstraintChange}
        ></Filter>
      <NewPersonForm
        name={newName}
        number={newNumber}
        handleSubmit={handleNewPerson}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        ></NewPersonForm>
      <Persons persons={filterPersons()}></Persons>
    </div>
  )

}

export default App