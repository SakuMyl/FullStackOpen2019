import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = props => {

    const username = useField('text')
    const password = useField('password')

    const handleLogin = async event => {
        event.preventDefault()
        props.login(username.value, password.value)
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td>käyttäjätunnus:</td>
                            <td>
                                <input {...username.getPropsForInputField()}/>
                            </td>
                        </tr>
                        <tr>
                            <td>salasana:</td>
                            <td>
                                <input {...password.getPropsForInputField()}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LoginForm)