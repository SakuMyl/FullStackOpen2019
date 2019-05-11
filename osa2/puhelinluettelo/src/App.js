import React, { useState, useEffect } from 'react'
import {getAll, create, remove, update} from './AxiosUtils'
import {Header, Filter, NewPersonForm, Persons} from './Components'

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
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleConstraintChange = (event) => {
    setNewConstraint(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const existingPerson = persons.find(p => p.name === person.name)
        update(existingPerson.id, person).then(response => setPersons(response))
        setNewName('')
        setNewNumber('')
      }
    } else {
        if(person.name && person.number) {
          create(person)
            .then(response => setPersons(response.data))
            .catch(err => console.log(err))
          setNewName('')
          setNewNumber('')
        }
        else {
          window.alert('Anna nimi ja numero!')
        }
    }
  } 

  const joinNameAndNumber = (person) => (
    `${person.name.toLowerCase()} ${person.number}`
  )

  const removePerson = (person) => {
    if(window.confirm(`Poistetaanko ${person.name}?`)) {
      remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const filterPersons = () => {
    return(
      persons.filter(person => joinNameAndNumber(person).includes(newConstraint.toLowerCase()))
           .map(person => 
              <div key={person.id}>
                  <span>{person.name} {person.number} </span>
                  <button
                    onClick={() => removePerson(person)}>
                    Poista
                  </button>
              </div>
           )
    )
  }

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