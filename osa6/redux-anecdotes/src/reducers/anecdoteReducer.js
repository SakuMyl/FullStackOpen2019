import anecdoteService from '../services/anecdotes'

export const vote = anecdote => {
    return {
        type: 'VOTE',
        anecdote
    }
}
export const create = content => {
    return {
        type: 'CREATE_NEW',
        data: content
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
        return state.map(a => a.id === action.anecdote.id ? { ...a, votes: a.votes + 1 } : a)
    case 'CREATE_NEW':
        return state.concat(action.data)
    case 'INITIALIZE':
        return action.data
    default:
        return state
    }
}

export default anecdoteReducer