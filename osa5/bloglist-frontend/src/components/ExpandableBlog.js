import React from 'react'
import Expandable from './Expandable'
import PropTypes from 'prop-types'
import { remove, like } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const ExpandableBlog = props => {

    const blog = props.blog
    const showWhenOwned = { display: props.userOwns ? '' : 'none' }

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
    return (
        <Expandable label={`${blog.title} ${blog.author}`}>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes} likes </span>
                <button onClick={() => props.like(blog)}>like</button>
            </div>
            <div>Added by {blog.user.name}</div>
            <button style={showWhenOwned} onClick={handleRemoval}>remove</button>
        </Expandable>
    )
}

ExpandableBlog.propTypes = {
    remove: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    userOwns: PropTypes.bool.isRequired
}

const mapDispatchToProps = {
    remove,
    like,
    setNotification
}

export default connect(null, mapDispatchToProps)(ExpandableBlog)