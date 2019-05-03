import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, name}) => (
    <button onClick ={handleClick}>{name}</button>
)
const Header = ({title}) => (
    <h1>{title}</h1>
)
const Statistic = ({text, value}) => {
    return(
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody> 
    )
}
const Statistics = ({data}) => {
    const {bad, neutral, good} = data
    const total = () => (
        good + neutral + bad
    )

    const positive = () => good * 100 / total()
    
    const average = () => (good - bad) / total()

    const stats = () => {
        if(total() == 0) {
            return <p>Ei yhtään palautetta annettu</p>
        }
        else {
            return(
                <table>
                    <Statistic text="Hyvä:" value = {good}></Statistic>
                    <Statistic text="Neutraali:" value = {neutral}></Statistic>
                    <Statistic text="Huono:" value = {bad}></Statistic>
                    <Statistic text="Yhteensä:" value = {total()}></Statistic>
                    <Statistic text="Keskiarvo:" value = {average()}></Statistic>
                    <Statistic text="Positiivisia:" value = {positive()}></Statistic>
                </table>
            )
        }
    }
    return(
        <div>
            <Header title={"Statistiikka"}></Header>
            {stats()}
       </div>
    )
}
const App = () => {
  
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const setNeutralTo = (value) => (
        setNeutral(value)
    )
    const setGoodTo = (value) => (
        setGood(value)
    )
    const setBadTo = (value) => (
        setBad(value)
    )
    const data = {
        good: good,
        neutral: neutral,
        bad: bad
    }
    return(
        <div>
            <Header title={"Anna palautetta"}></Header>
            <Button handleClick={() => setGoodTo(good + 1)} name={"Hyvä"}></Button>
            <Button handleClick={() => setNeutralTo(neutral + 1)} name={"Neuraali"}></Button>
            <Button handleClick={() => setBadTo(bad + 1)} name={"Huono"}></Button>
            <Statistics data={data}></Statistics>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
