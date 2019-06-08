import React from 'react'
import '../styles/Notification.css'

const Notification = props => {

    return (
        <div className={props.className}>{props.message}</div>
    )
}

export default Notification