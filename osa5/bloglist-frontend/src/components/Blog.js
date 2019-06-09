import React from 'react'
import Expandable from './Expandable'
import PropTypes from 'prop-types'

const Blog = ({ remove, like, blog, userOwns }) => {

    const showWhenOwned = { display: userOwns ? '' : 'none' }
    return (
        <Expandable label={`${blog.title} ${blog.author}`}>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes} likes </span>
                <button onClick={() => like(blog)}>like</button>
            </div>
            <div>Added by {blog.user.name}</div>
            <button style={showWhenOwned} onClick={() => remove(blog)}>remove</button>
        </Expandable>
    )
}

Blog.propTypes = {
    remove: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    userOwns: PropTypes.bool.isRequired
}

export default Blog