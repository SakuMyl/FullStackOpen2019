import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import {create, vote} from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = store.getState()
  
  const voteAnecdote = (id) => {
    store.dispatch(vote(id))
  }
  
  const sorted = anecdotes => (
    anecdotes.sort((a, b) => b.votes - a.votes)
  )
  
  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
