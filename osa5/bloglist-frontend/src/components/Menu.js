import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import '../styles/Menu.css'

const Menu = props => {

    return (
        <div className='Menu'>
            <span className='Link'><Link to='/'>blogs</Link></span>
            <span className='Link'><Link to='/users'>users</Link></span>
            <span>{props.user.name} logged in</span>
            <button onClick={props.logout}>logout</button>
        </div>
    )
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(Menu)