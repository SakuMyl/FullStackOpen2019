export const clear = () => {
    return {
        type: 'CLEAR'
    }
}
const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'VOTE':
            return `You voted '${action.data.content}'`
        case 'CREATE_NEW':
            return `You created '${action.data.content}'`
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export default notificationReducer