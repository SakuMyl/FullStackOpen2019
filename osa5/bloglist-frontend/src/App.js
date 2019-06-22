import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, checkLogin } from './reducers/userReducer'
import { Route } from 'react-router'
import './App.css'

const App = props => {

    const user = props.user

    useEffect(() => {
        props.initializeBlogs()
        props.checkLogin()
    }, [])



    if(user === null) {
        return (
            <div>
                <h2>Log in</h2>
                <Notification/>
                <LoginForm/>
            </div>
        )
    }

    return (
        <div>
            <Menu user={user}/>

            <h1>Bloglist</h1>

            <Notification/>

            <Route exact path={['/', '/blogs']} render={() => <Blogs/>}/>
            <Route exact path='/users' render={() => <Users/>}/>
            <Route path='/users/:id' render={({ match }) => <User match={match} id={match.params.id}/>}/>
            <Route path='/blogs/:id' render={({ match }) => <Blog id={match.params.id}/>}/>
        </div>
    )
}

const mapDispatchToProps = {
    initializeBlogs,
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