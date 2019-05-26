import React from 'react'

const SubmitButton = () => (
  <button type="submit" className="submitButton">lisää</button>
)
const Notification = ({ message, type }) => {
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
    <div className='Filter'>
      Rajaa näytettäviä: <input
        value = {props.constraint}
        onChange = {props.handleChange}
      />
    </div>
  )
}
  const NewPersonForm = (props) => {
    return(
      <div className='NewPersonForm'>
        <h2>Lisää uusi</h2>
        <form onSubmit = {props.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>nimi:</td>
                <td>
                  <input 
                  value = {props.name}
                  onChange={props.handleNameChange}
                  />
                </td>
              </tr>
              <tr>
                <td>numero:</td> 
                <td>
                  <input
                  value = {props.number}
                  onChange={props.handleNumberChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <SubmitButton 
              text='lisää'
            />
          </div>
            
        </form>
      </div>
    )
  }
  const Persons = ({persons, handleRemove}) => {
    const list = persons.map(person => 
        <tbody className='Person' key={person.id}>
          <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button
                onClick={() => handleRemove(person)}>
                Poista
              </button>
            </td>
          </tr>
        </tbody>
      )

    return(
      <div className='Persons'>
        <h2>Numerot</h2>
        {list}
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