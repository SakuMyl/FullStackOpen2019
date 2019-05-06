import React from 'react'

const Course = ({name, parts}) => {
    const totalExercises = () => (
        <Total exercises={parts.map(p => p.exercises)}></Total>
    )
    return(
        <>
            <Header course={name}></Header>
            <Content parts={parts}></Content>
            {totalExercises()}
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
const Content = ({parts}) => {
    const createParts = () => {
        return(
            parts.map(part => <Part part={part.name} exercises={part.exercises}></Part>)
        )
    }
    return(
        <>
            {createParts()}
        </>
    )
}
const Header = (props) => {
    return(
        <>
            <h1>{props.course}</h1>
        </>
    )
}
const Total = ({exercises}) => {
    const total = () => {
        return exercises.reduce((accumulator, current) => accumulator + current)
    }
    return(
        <>
            <p>yhteensä {total()} tehtävää</p>
        </>
    )
}

export default Course