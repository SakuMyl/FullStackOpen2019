import React from 'react'

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

export {
    Header,
    Filter,
    NewPersonForm,
    Persons
}