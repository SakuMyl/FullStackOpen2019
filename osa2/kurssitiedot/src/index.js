import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Course'

const App = () => {
    const courses = [
        {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
            name: 'Reactin perusteet',
            exercises: 10
            },
            {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
            },
            {
            name: 'Komponenttien tila',
            exercises: 14
            }
        ]   
        },
        {
        name: 'Node.js',
        id: 2,
        parts: [
           {
            name: 'Routing',
            exercises: 3,
            id: 1
            },
            {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
            }
        ]
        }
    ]
    const createCourses = () => {
        return(
            courses.map(course => <Course name={course.name} parts={course.parts}></Course>)
        )
    }
    return (
        <div>
            {createCourses()}
        </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
