import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { clear } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {

    const createAnecdote = event => {
        event.preventDefault()
        props.create(event.target.anecdote.value)
        setTimeout(() => {
            props.clear()
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
const mapDispatchToProps = {
    create, 
    clear
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)