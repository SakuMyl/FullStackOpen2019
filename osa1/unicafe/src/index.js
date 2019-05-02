import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, name}) => (
    <button onClick ={handleClick}>{name}</button>
)
const Header = ({title}) => (
    <h1>{title}</h1>
)
const Statistics = ({text, value}) => (
    <p>{text} {value}</p>
)
const App = () => {
  
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = () => (
        good + neutral + bad
    )
    const showStats = () => {
        if(total() == 0) {
            return <p>Ei yhtään palautetta annettu</p>
        }
        else {
            return(
            <>
                <Statistics text={"Hyvä:"} value = {good}></Statistics>
                <Statistics text={"Neutraali:"} value = {neutral}></Statistics>
                <Statistics text={"Huono:"} value = {bad}></Statistics>
                <Statistics text={"Yhteensä:"} value = {total()}></Statistics>
                <Statistics text={"Keskiarvo:"} value = {average()}></Statistics>
                <Statistics text={"Positiivisia:"} value = {positive()}></Statistics>
            </>
            )
        }
    }
    const positive = () => good * 100 / total()
    
    const average = () => (good - bad) / total()
    
    const setNeutralTo = (value) => (
        setNeutral(value)
    )
    const setGoodTo = (value) => (
        setGood(value)
    )
    const setBadTo = (value) => (
        setBad(value)
    )
    return(
        <div>
            <Header title={"Anna palautetta"}></Header>
            <Button handleClick={() => setGoodTo(good + 1)} name={"Hyvä"}></Button>
            <Button handleClick={() => setNeutralTo(neutral + 1)} name={"Neuraali"}></Button>
            <Button handleClick={() => setBadTo(bad + 1)} name={"Huono"}></Button>
            <Header title={"Statistiikka"}></Header>
            {showStats()}
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
