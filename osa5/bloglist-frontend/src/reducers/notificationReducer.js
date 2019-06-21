export const clear = () => {
    return {
        type: 'CLEAR'
    }
}

export const setNotification = (content, options, timeout=5) => {
    return async dispatch => {
        const error = options ? options.error : false
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: {
                content,
                error
            }
        })
        setTimeout(() => {
            dispatch(clear())
        }, timeout * 1000)
    }
}
const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_NOTIFICATION':
            return action.data
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export default notificationReducer