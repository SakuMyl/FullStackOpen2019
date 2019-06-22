import React from 'react'
import { connect } from 'react-redux'
import { like, remove, comment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks';

const Blog = props => {

    const blog = props.blog

    if(!blog) return null

    const comment = useField('text')

    const userOwns = blog.user.name === props.user.name
    const showWhenOwned = { display: userOwns ? '' : 'none' }

    const handleRemoval = async () => {
        try {
            if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                props.remove(blog.id)
                props.setNotification(`${blog.title} by ${blog.author} removed successfully`)
            }
        } catch(error) {
            props.setNotification(error.response.data.error, { error: true })
        }
    }

    const handleNewComment = (event) => {
        event.preventDefault()
        props.comment(comment.value, blog)
        comment.reset()
    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes} likes</span>
                <button onClick={() => props.like(blog)}>like</button>
            </div>
            <div>Added by {blog.user.name}</div>
            <button style={showWhenOwned} onClick={handleRemoval}>remove</button>
            <h2>comments</h2>
            <form onSubmit={handleNewComment}>
                <input {...comment.getPropsForInputField()}/>
                <button type='submit'>add comment</button>
            </form>
            <ul>
                {blog.comments.map(comment =>
                    <li key={comment.id}>{comment.content}</li>
                )}
            </ul>
        </div>

    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs.find(b => b.id === ownProps.id),
        user: state.user
    }
}

const mapDispatchToProps = {
    like,
    remove,
    comment,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)