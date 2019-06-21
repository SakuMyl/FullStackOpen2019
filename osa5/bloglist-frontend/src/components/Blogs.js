import React, { useState } from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import { connect } from 'react-redux'

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
                <Blog key={blog.id} userOwns={user.name === blog.user.name} blog={blog}/>
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