import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer';

export const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    return {
        type: 'LOGOUT'
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN',
                user
            })
        } catch(e) {
            dispatch(setNotification('Invalid username or password', { error: true }))
        }
    }
}

export const checkLogin = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        return {
            type: 'FROM_LOCAL_STORAGE',
            user
        }
    }
    return {
        type: 'NOT_LOGGED_IN'
    }
}

const userReducer = (state=null, action) => {
    switch(action.type) {
    case 'LOGIN':
        return action.user
    case 'LOGOUT':
        return null
    case 'FROM_LOCAL_STORAGE':
        return action.user
    default:
        return state
    }
}

export default userReducer