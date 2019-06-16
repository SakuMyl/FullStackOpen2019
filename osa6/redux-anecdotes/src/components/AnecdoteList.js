import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { clear } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {

    const anecdotes = props.anecdotesToShow

    const voteAnecdote = anecdote => {
        props.vote(anecdote)
        setTimeout(() => {
            props.clear()
        }, 5000)
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

const filter = ({anecdotes, filter}) => (
    anecdotes.filter(anecdote => anecdote.content.includes(filter))
)

const mapStateToProps = state => {
    return {
        anecdotesToShow: filter(state)
    }
}

const mapDispatchToProps = {
    vote,
    clear
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)