import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const Header = ({text}) => (
    <h1>{text}</h1>
)
const Anecdote = ({text, votes}) => {
    return(
        <div>
            <p>{text}</p>
            <p>Has {votes} votes</p>
        </div>
    )
}
const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const select = (index) => {
        let i = index
        while(i == selected) i = random()
        setSelected(i)
    }
    const vote = (index) => {
        const copy = [...votes]
        copy[index] += 1
        setVotes(copy)
    }
    const mostVoted = () => {
        let res = 0
        for(let i = 1; i < props.anecdotes.length; i++) {
            if(votes[i] > votes[res]) res = i
        }
        return res
    }
    const best = mostVoted()

    const random = () => Math.floor(Math.random() * votes.length)
    return (
        <div>
            <Header text="Anecdote of the day"></Header>
            <Anecdote text={props.anecdotes[selected]} votes={votes[selected]}></Anecdote>
            <div>
                <Button handleClick={() => vote(selected)} text="Vote"></Button>
                <Button handleClick={() => select(random())} text="Next anecdote"></Button>
            </div>
            <Header text="Anecdote with most votes"></Header>
            <Anecdote text={props.anecdotes[best]} votes={votes[best]}></Anecdote>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
