import React from 'react'
import { useField } from '../hooks'

const LoginForm = ({
    onSubmit
}) => {

    const username = useField('text')
    const password = useField('password')

    return (
        <div>
            <form onSubmit={(event) => onSubmit(username.value, password.value, event)}>
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

export default LoginForm