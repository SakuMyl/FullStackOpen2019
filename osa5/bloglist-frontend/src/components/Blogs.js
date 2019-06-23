import React, { useState } from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
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
            <Togglable textOnHidden='Create new blog' textOnShown='Cancel' ref={createBlogRef}>
                <CreateBlog
                    user={user}
                    handleNewBlog={handleNewBlog}
                />
            </Togglable>
            <List divided relaxed>
                {blogs.sort((a, b) => { return b.likes - a.likes;}).map(blog =>
                    <List.Item key={blog.id}>
                        <List.Content>
                            <List.Header>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </List.Header>
                            <List.Description>
                                {blog.author}
                            </List.Description>
                        </List.Content>

                    </List.Item>
                )}
            </List>
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