import React, { useState, useEffect } from 'react'
import {getAll, create, remove, update} from './AxiosUtils'
import {Header, Filter, NewPersonForm, Persons, Notification} from './Components'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [newConstraint, setNewConstraint] = useState('')
  const [notification, setNotification] = useState({message:null, error:false})

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

  const setNotificationState = (state) => {
    setNotification(state)
    setTimeout(() =>{
      setNotification({message:null})
    }, 5000)
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
        update(existingPerson.id, person)
          .then(response => 
            setPersons(persons.map(p => 
              p.name === person.name ?
              response : p)))
          .catch(() => 
            setNotificationState(
              {
                message:`${person.name} oli jo poistettu`,
                type:'error'
              })
          )
        setNewName('')
        setNewNumber('')
        setNotificationState(
          {
            message:`Päivitettiin ${person.name}`,
            type:'notification'
          })
      }
    } else {
        if(person.name && person.number) {
          create(person)
            .then(response => setPersons(persons.concat(response)))
          setNewName('')
          setNewNumber('')
          setNotificationState(
            {
              message:`Lisättiin ${person.name}`,
              type:'notification'
            })
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
        .then(() => setPersons(persons.filter(p => p.id !== person.id)))
      setNotificationState(
        {
          message:`Poistettiin ${person.name}`,
          type:'notification'
        })
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
      <Notification 
        message={notification.message}
        type={notification.type}
      />
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