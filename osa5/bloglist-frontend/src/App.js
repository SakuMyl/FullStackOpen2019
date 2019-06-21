import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, checkLogin } from './reducers/userReducer'
import { Route } from 'react-router'
import './App.css'

const App = props => {

    const user = props.user

    useEffect(() => {
        props.initializeBlogs()
        props.checkLogin()
    }, [])

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

            <Route exact path='/' render={() => <Blogs/>}/>
            <Route path='/users' render={() => <Users/>}/>
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