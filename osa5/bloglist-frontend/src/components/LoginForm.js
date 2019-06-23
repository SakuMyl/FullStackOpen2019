import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = props => {

    const username = useField('text')
    const password = useField('password')

    const handleLogin = async event => {
        event.preventDefault()
        props.login(username.value, password.value)
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
                <Form.Field width={5}>
                    <label>käyttäjätunnus</label>
                    <input {...username.getPropsForInputField()}/>
                </Form.Field>
                <Form.Field width={5}>
                    <label>salasana</label>
                    <input {...password.getPropsForInputField()}/>
                </Form.Field>
                <Button type="submit">kirjaudu</Button>
            </Form>
        </div>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LoginForm)