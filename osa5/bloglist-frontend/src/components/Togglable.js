import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => { //eslint-disable-line react/display-name
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <Button content={visible ? props.textOnShown : props.textOnHidden} size='small' onClick={toggleVisibility}/>
            <div style={showWhenVisible}>
                {props.children}
            </div>
        </div>
    )
})

export default Togglable