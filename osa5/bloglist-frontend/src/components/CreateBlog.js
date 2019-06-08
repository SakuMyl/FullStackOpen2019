import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import '../styles/CreateBlog.css'

const CreateBlog = (props) => {

    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    useEffect(() => {
        if(props.user) {
            blogService.setToken(props.user.token)
        }
    }, [])

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            await blogService
                .create(newBlog)
            
            props.setNotification(`${newBlog.title} by ${newBlog.author} added`)
            setNewBlog({title: '', author: '', url: ''})
            
            blogService.getAll().then(blogs =>
                props.handleNewBlog( blogs )
            ) 
        } catch(error) {
            console.log(error)
            props.setErrorMessage(error.response.data.error)
        }
    }

    const onChange = (key, event) => {
        const blog = {...newBlog}
        blog[key] = event.target.value
        setNewBlog(blog)
    }

    return (
        <div className='CreateNewBlogContainer'>
            <h2>create new</h2>
            <form className='CreateNewBlog' onSubmit={handleNewBlog}>
                <table>
                    <tbody>
                        {Object.keys(newBlog).map(key => 
                            <tr key={key}>
                                <td>{key}:</td>
                                <td>
                                    <input
                                        value={newBlog[key]}
                                        onChange={(event) => onChange(key, event)}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default CreateBlog