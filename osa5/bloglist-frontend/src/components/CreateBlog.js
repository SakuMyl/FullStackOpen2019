import React from 'react'
import { useField } from '../hooks'
import { create } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

const CreateBlog = (props) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const fields = { title, author, url }

    const add = async (event) => {
        event.preventDefault()
        try {
            await props
                .create( { title: title.value, author: author.value, url: url.value }, props.user )

            props.handleNewBlog()

            props.setNotification(`${title.value} by ${author.value} added`)
            Object.keys(fields).forEach(key => fields[key].reset())
        } catch(error) {
            props.setNotification(error.response.data.error, { error: true })
        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <Form onSubmit={add}>
                {Object.keys(fields).map(key =>
                    <Form.Field width={5} key={key}>
                        <label>{key}</label>
                        <input {...fields[key].getPropsForInputField()}/>
                    </Form.Field>
                )}
                <Button size='small' type='submit'>submit</Button>
            </Form>
        </div>
    )
}

const mapDispatchToProps = {
    create,
    setNotification
}

export default connect(null, mapDispatchToProps)(CreateBlog)