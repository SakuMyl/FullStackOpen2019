import React from 'react'
import '../styles/Notification.css'
import { connect } from 'react-redux'

const Notification = props => {

    const notification = props.notification

    return (
        notification.content ?
            <div className={notification.error ? 'Error' : 'Notification'}>{notification.content}</div>
            : null
    )
}

const mapStateToProps = state => {
    return {
        notification: state.notification
    }
}

export default connect(
    mapStateToProps
)(Notification)