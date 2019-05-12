import React from 'react'

const SubmitButton = () => (
  <button type="submit" className="submitButton">lisää</button>
)
const Notification = ({ message, type="notification" }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

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
            <SubmitButton 
              text='lisää'
            />
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
    Persons,
    Notification
}