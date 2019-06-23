import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = props => {

    const notification = props.notification

    return (
        notification.content ?
            <Message negative={notification.error} positive={!notification.error}>{notification.content}</Message>
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