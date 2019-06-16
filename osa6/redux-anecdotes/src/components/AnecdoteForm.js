import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { clear } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

    const createAnecdote = event => {
        event.preventDefault()
        store.dispatch(create(event.target.anecdote.value))
        setTimeout(() => {
            store.dispatch(clear())
        }, 5000)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm