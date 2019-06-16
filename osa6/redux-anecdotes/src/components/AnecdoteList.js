import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { clear } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

    const anecdotes = store.getState().anecdotes

    const voteAnecdote = anecdote => {
        store.dispatch(vote(anecdote))
        setTimeout(() => {
            store.dispatch(clear())
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

export default AnecdoteList