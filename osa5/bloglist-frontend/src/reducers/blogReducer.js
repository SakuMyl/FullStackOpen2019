import blogService from '../services/blogs'

export const like = blog => {
    blogService.update(blog.id, { likes: blog.likes + 1 })
    return {
        type: 'LIKE',
        data: {
            ...blog,
            likes: blog.likes + 1
        }
    }
}
export const comment = (content, blog) => {
    return async dispatch => {
        const comment = await blogService.comment(blog.id, content)
        const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
        dispatch({
            type: 'COMMENT',
            data: updatedBlog
        })
    }
}

export const create = (content, user) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'CREATE_NEW',
            data: {
                ...newBlog,
                user
            }
        })
    }
}
export const remove = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE',
            id
        })
    }
}
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: blogs
        })
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'LIKE':
        return state.map(a => a.id === action.data.id ? { ...a, likes: a.likes + 1 } : a)
    case 'COMMENT':
        return state.map(a => a.id === action.data.id ? action.data : a)
    case 'CREATE_NEW':
        return state.concat(action.data)
    case 'REMOVE':
        return state.filter(blog => blog.id !== action.id)
    case 'INITIALIZE':
        return action.data
    default:
        return state
    }
}

export default blogReducer