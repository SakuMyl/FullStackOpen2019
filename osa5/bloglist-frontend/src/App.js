import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, checkLogin } from './reducers/userReducer'
import './App.css'

const App = props => {

    const blogs = props.blogs
    const user = props.user
    const createBlogRef = useState(React.createRef())[0]

    useEffect(() => {
        props.initializeBlogs()
    }, [])

    useEffect(() => {
        props.checkLogin()
    }, [])

    const handleNewBlog = () => {
        createBlogRef.current.toggleVisibility()
    }

    const handleLogin = async (username, password, event) => {
        event.preventDefault()
        props.login(username, password)
    }

    if(user === null) {
        return (
            <div>
                <h2>Log in</h2>
                <Notification/>
                <LoginForm
                    onSubmit={handleLogin}/>
            </div>
        )
    }

    return (
        <div>
            <h1>Bloglist</h1>

            <Notification/>

            <p>{user.name} logged in</p>

            <button onClick={props.logout}>Log out</button>

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

const mapDispatchToProps = {
    setNotification,
    initializeBlogs,
    login,
    logout,
    checkLogin
}
const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)