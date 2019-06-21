import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(response => setUsers(response))
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <table>
                <tbody>
                    <tr>
                        <th/>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users