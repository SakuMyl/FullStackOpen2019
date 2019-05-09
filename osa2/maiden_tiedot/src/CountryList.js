import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button} from './Utils'

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
          <WeatherInfo
            city={country.capital}
          />
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


  const WeatherInfo = ({city}) => {
    const [data, setData] = useState([])
    const [showData, setShowData] = useState(false)
    useEffect(() => {
      axios
      .get(`http://api.apixu.com/v1/current.json?key=83fee21e8f35435c826163141190905&q=${city}`)
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
        setShowData(true)
      })
    }, [])
    console.log()
    if(showData) {
      return(
        <div>
          <h3>Weather in {city}</h3>
          <p><b>Temperature:</b> {data.current.temp_c} Celsius</p>
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          />
          <p><b>Wind:</b> {data.current.wind_kph} kph direction {data.current.wind_dir}</p>
        </div> 
      )
    } else {
      return <p>Waiting for data...</p>
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
            key = {country.name}
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

export default CountryList