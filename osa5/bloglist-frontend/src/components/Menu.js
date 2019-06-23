import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Menu, Button } from 'semantic-ui-react'

const AppMenu = props => {

    return (
        <Menu>
            <Menu.Item link>
                <Link to='/'>blogs</Link>
            </Menu.Item>
            <Menu.Item link>
                <Link to='/users'>users</Link>
            </Menu.Item>
            <Menu.Item>
                {props.user.name} logged in
            </Menu.Item>
            <Menu.Item>
                <Button onClick={props.logout}>logout</Button>
            </Menu.Item>
        </Menu>
    )
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(AppMenu)