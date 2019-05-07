import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Button = ({text, handleClick}) => {
  return(
    <button
      onClick={() => handleClick()}>
      {text}
    </button>
  )
}
const Country = ({country, showDetails}) => {
  const [details, setDetails] = useState(showDetails)
  const handleChange = () => {
    setDetails(!details)
  }
  if(details) {
    return(
      <div>
        <h2>{country.name}</h2>
        <Button
          handleClick={() => handleChange()}
          text = 'Hide'
        />
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <Languages
          languages={country.languages}
        />
        <img
          src={country.flag}
          alt={`The flag of ${country.name}`}
          height={100}
          width={100}
        ></img>
      </div>
    )
  }
  else {
    return (
      <div>
        {country.name} 
        <Button
          handleClick={() => handleChange()}
          text='Show'
        />
      </div>
    )
  }
}
const Languages = ({languages}) => {
  const languageList = () => (
    languages.map(language => <li key={language.name}>{language.name}</li>)
  )
  console.log(languageList())
  return(
    <div>
      <h3>Languages</h3>
      <ul>
        {languageList()}
      </ul>
      
    </div>
  )
}
const CountryList = ({countries}) => {
  const showCountries = () => {
    return( 
      countries.map(country => 
        <Country 
          country={country}
          showDetails={false}
        />
      )
    )
  }
  if(countries.length > 10) {
    return <p>Too many matches, specify another filter </p>
  }
  else if(countries.length > 1){
    return <div>{showCountries()}</div>
  }
  else if(countries.length == 1) {
    return (
      <Country 
        country={countries[0]}
        showDetails={true}
      />
    )
  }
  else {
    return <p>No countries found</p>
  }
}
const InputField = ({value, handleChange}) => {
  return(
    <div>
      Find countries<input
        value = {value}
        onChange = {handleChange}
      />
    </div>
  )
}
const App = () => {
  const [currentInput, setInput] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('response fulfilled')
        setCountries(response.data)
      })
  }, [])
  
  const handleInputChange = (event) => {
    setInput(event.target.value)
  }
  
  const filterCountries = () => {
    return countries.filter(country => country.name.toLowerCase().includes(currentInput.toLowerCase()))
  }
  return(
    <div>
      <InputField 
        value={currentInput} 
        handleChange={handleInputChange}
      />
      <CountryList
        countries={filterCountries()}
      />
    </div>
  )
}


export default App

