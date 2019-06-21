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

import './App.css'

const App = props => {

    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs( blogs )
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const createBlogRef = React.createRef()

    const handleNewBlog = () => {
        createBlogRef.current.toggleVisibility()
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

    const handleBlogLike = async (blog) => {
        blogService.update(blog.id, { likes: blog.likes + 1 })
        const newBlogs = blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)
        setBlogs(newBlogs)
    }

    const handleBlogRemoval = async (blog) => {
        try {
            if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                await blogService.remove(blog.id)
                const newBlogs = blogs.filter(b => b.id !== blog.id)
                setBlogs(newBlogs)
                handleNotification(`${blog.title} by ${blog.author} removed successfully`)
            }
        } catch(error) {
            handleErrorMessage(error.response.data.error)
        }
    }

    const handleErrorMessage = message => {
        setError(true)
        props.setNotification(message)
        setTimeout(() => {
            setError(false)
            props.setNotification('')
        }, 5000)
    }
    const handleNotification = message => {
        props.setNotification(message)
        setTimeout(() => {
            props.setNotification('')
        }, 5000)
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
            handleErrorMessage('käyttäjätunnus tai salasana virheellinen')
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
                <Notification className={error ? 'Error' : 'Notification' }/>
                <LoginForm
                    onSubmit={handleLogin}/>
            </div>
        )
    }

    return (
        <div>
            <h1>Bloglist</h1>

            <Notification className={error ? 'Error' : 'Notification' }/>

            <p>{user.name} logged in</p>

            <button onClick={handleLogout}>Log out</button>

            <Togglable buttonLabel='Create new blog' ref={createBlogRef}>
                <CreateBlog
                    user={user}
                    handleNewBlog={handleNewBlog}
                    setNotification={handleNotification}
                    setErrorMessage={handleErrorMessage}
                />
            </Togglable>
            {blogs.sort((a, b) => { return b.likes - a.likes;}).map(blog =>
                <Blog key={blog.id} userOwns={user.name === blog.user.name} remove={handleBlogRemoval}blog={blog} like={handleBlogLike}/>
            )}
        </div>
    )
}

const mapDispatchToProps = {
    setNotification
}

export default connect(null, mapDispatchToProps)(App)