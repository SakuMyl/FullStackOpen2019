import React from 'react'
import '../styles/Notification.css'
import { connect } from 'react-redux'

const Notification = props => {

    return (
        props.notification ?
            <div className={props.className}>{props.notification}</div>
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