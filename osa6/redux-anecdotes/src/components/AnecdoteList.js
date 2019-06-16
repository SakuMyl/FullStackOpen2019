import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { clear } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {

    const anecdotes = props.anecdotes

    const voteAnecdote = anecdote => {
        props.vote(anecdote)
        setTimeout(() => {
            props.clear()
        }, 5000)
    }
    const filter = anecdotes => (
        anecdotes.filter(anecdote => anecdote.content.includes(store.getState().filter))
    )

    const sorted = anecdotes => (
        anecdotes.sort((a, b) => b.votes - a.votes)
    )

    return (
        <div>
            {sorted(filter(anecdotes)).map(anecdote =>
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

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes
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