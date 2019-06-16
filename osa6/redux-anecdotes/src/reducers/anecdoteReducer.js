import anecdotes from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const vote = anecdote => {
    return {
        type: 'VOTE',
        anecdote
    }
}
export const create = content => {
    return {
        type: 'CREATE_NEW',
        data: asObject(content)
    }
}
export const initializeAnecdotes = anecdotes => {
    return {
        type: 'INITIALIZE',
        data: anecdotes
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