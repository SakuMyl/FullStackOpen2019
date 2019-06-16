import anecdoteService from '../services/anecdotes'

export const vote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update({votes: anecdote.votes + 1}, anecdote.id)
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}
export const create = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(content)
        dispatch({
            type: 'CREATE_NEW',
            data: newAnecdote
        })
    }
}
export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: anecdotes
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    switch(action.type) {
    case 'VOTE':
        return state.map(a => a.id === action.data.id ? { ...a, votes: a.votes + 1 } : a)
    case 'CREATE_NEW':
        return state.concat(action.data)
    case 'INITIALIZE':
        return action.data
    default:
        return state
    }
}

export default anecdoteReducer