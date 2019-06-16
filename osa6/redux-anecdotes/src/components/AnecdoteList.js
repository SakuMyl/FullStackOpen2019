import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {

    const anecdotes = props.anecdotesToShow

    const voteAnecdote = anecdote => {
        props.vote(anecdote)
        props.setNotification(`You voted '${anecdote.content}'`, 5)
    }

    const sorted = anecdotes => (
        anecdotes.sort((a, b) => b.votes - a.votes)
    )

    return (
        <div>
            {sorted(anecdotes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const filter = ({anecdotes, filter}) => {
    console.log(anecdotes)
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = state => {
    return {
        anecdotesToShow: filter(state)
    }
}

const mapDispatchToProps = {
    vote,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)