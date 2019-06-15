import React from 'react';
import {create, vote} from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = store.getState()
  
  const voteAnecdote = (id) => {
    store.dispatch(vote(id))
  }
  const createAnecdote = event =>{
    event.preventDefault()
    store.dispatch(create(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
