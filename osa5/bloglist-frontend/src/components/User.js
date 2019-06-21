import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { connect } from 'react-redux'

const User = props => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.get(props.id).then(response => setUser(response))
    }, [])

    if(!user) return null

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {props.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.blogs.filter(blog => blog.user.id === ownProps.id)
    }
}

export default connect(mapStateToProps)(User)