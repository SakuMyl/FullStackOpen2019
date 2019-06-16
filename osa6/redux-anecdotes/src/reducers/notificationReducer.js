export const clear = () => {
    return {
        type: 'CLEAR'
    }
}

export const setNotification = (content, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            content
        })
        setTimeout(() => {
            dispatch(clear())
        }, timeout * 1000)
    }
}
const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_NOTIFICATION':
            return action.content
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export default notificationReducer