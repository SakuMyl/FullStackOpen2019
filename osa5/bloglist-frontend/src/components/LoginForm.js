import React from 'react'

const LoginForm = ({
    onSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {

    return (
        <div>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>käyttäjätunnus:</td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    name="Username"
                                    onChange={({ target }) => handleUsernameChange(target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>salasana:</td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    name="Password"
                                    onChange={({ target }) => handlePasswordChange(target.value)}
                                />
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