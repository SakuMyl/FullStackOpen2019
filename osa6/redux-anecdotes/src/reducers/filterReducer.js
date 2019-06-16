
export const changeFilter = data => {
    return {
        type: 'CHANGE',
        data
    }
}

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGE':
            return action.data
        default:
            return state
    }
}

export default filterReducer