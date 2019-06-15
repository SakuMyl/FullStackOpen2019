import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {

    const anecdotes = store.getState()

    const voteAnecdote = (id) => {
        store.dispatch(vote(id))
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
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList