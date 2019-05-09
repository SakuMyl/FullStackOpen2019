import React from 'react'

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

const Button = ({text, handleClick}) => {
    return(
      <button
        onClick={() => handleClick()}>
        {text}
      </button>
    )
  }

export {InputField, Button}