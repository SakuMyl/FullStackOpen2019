import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import './App.css'

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [notification, setNotification]= useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
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

    const handleBlogLike = (blog) => {
        blogService.update(blog.id, { likes: blog.likes + 1 })
        const newBlogs = blogs.map(b => b.id === blog.id ? {...b, likes: b.likes + 1} : b)
        setBlogs(newBlogs)
    }

    const getNotification = () => {
        if(notification) {
            return (
                <Notification className='Notification' message={notification}/>
            )
        } else if(errorMessage) {
            return (
                <Notification className='Error' message={errorMessage}/>
            )
        } else {
            return undefined
        }
    }

    const handleErrorMessage = message => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
    const handleNotification = message => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
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
                {getNotification()}
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={setUsername}
                    handlePasswordChange={setPassword}
                    onSubmit={handleLogin}/>
            </div>
        )
    }

    return (
        <div>
            <h1>Bloglist</h1>

            {getNotification()}

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
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} like={handleBlogLike}/>
            )}
        </div>
    )
}

export default App