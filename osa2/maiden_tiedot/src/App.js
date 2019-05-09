import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {InputField} from './Utils'
import CountryList from './CountryList'


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

