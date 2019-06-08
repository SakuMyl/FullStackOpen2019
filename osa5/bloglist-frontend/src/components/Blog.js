import React from 'react'
import Expandable from './Expandable'

const Blog = ({ blog }) => {

    return (
        <Expandable label={`${blog.title} ${blog.author}`}>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes} likes </span>
                <button>like</button>
            </div>
            <span>Added by {blog.user.name}</span>
        </Expandable>
    )
}

export default Blog