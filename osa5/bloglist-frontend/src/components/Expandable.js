import React, { useState } from 'react'
import '../styles/Expandable.css'

const Expandable = props => {

    const [expanded, setExpanded] = useState(false)

    const showWhenExpanded = { display: expanded ? '' : 'none' }

    return (
        <div className='Expandable'>
            <div className='ExpandableTitle' onClick={() => setExpanded(!expanded)}>
                {props.label}
            </div>
            <div style={showWhenExpanded}>
                {props.children}
            </div>
        </div>
    )
}

export default Expandable