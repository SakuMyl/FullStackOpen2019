import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return(
        <>
            <h1>{props.course}</h1>
        </>
    )
}
const Total = (props) => {
    return(
        <>
            <p>yhteensä {props.e1 + props.e2 + props.e3} tehtävää</p>
        </>
    )
}
const Part = (props) => {
    return(
        <>
            <p>{props.part} {props.exercises}</p>
        </>
    )
}
const Content = (props) => {
    return(
        <>
            <Part part={props.part1} exercises={props.e1}/>
            <Part part={props.part2} exercises={props.e2}/>
            <Part part={props.part3} exercises={props.e3}/>
        </>
    )
}
const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
        <Header course={course} />
        <Content 
            part1={part1} 
            part2={part2} 
            part3={part3}
            e1={exercises1}
            e2={exercises2}
            e3={exercises3}/>
        <Total 
            e1={exercises1} 
            e2={exercises2} 
            e3={exercises3} />
        </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))