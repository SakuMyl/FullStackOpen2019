import React, { useState } from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/Expandable.css'

const Blogs = props => {

    const user = props.user
    const blogs = props.blogs
    const createBlogRef = useState(React.createRef())[0]

    const handleNewBlog = () => {
        createBlogRef.current.toggleVisibility()
    }

    return (
        <div>
            <Togglable buttonLabel='Create new blog' ref={createBlogRef}>
                <CreateBlog
                    user={user}
                    handleNewBlog={handleNewBlog}
                />
            </Togglable>
            {blogs.sort((a, b) => { return b.likes - a.likes;}).map(blog =>
                <div key={blog.id} className='Expandable'>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}

export default connect(mapStateToProps)(Blogs)