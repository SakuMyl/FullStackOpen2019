import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import './App.css'

const App = props => {

    const blogs = props.blogs
    const [user, setUser] = useState(null)
    const createBlogRef = useState(React.createRef())[0]

    useEffect(() => {
        props.initializeBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleNewBlog = () => {
        createBlogRef.current.toggleVisibility()
    }

    const handleLogin = async (username, password, event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)
        } catch (exception) {
            props.setNotification('käyttäjätunnus tai salasana virheellinen', { error: true })
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
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

            <button onClick={handleLogout}>Log out</button>

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
    initializeBlogs
}
const mapStateToProps = state => {
    return {
        blogs: state.blogs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)