import React, { useEffect } from 'react'
import blogService from '../services/blogs'
import '../styles/CreateBlog.css'
import { useField } from '../hooks'
import { create } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const CreateBlog = (props) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const fields = { title, author, url }

    useEffect(() => {
        if(props.user) {
            blogService.setToken(props.user.token)
        }
    }, [])

    const add = async (event) => {
        event.preventDefault()
        try {
            await props
                .create( { title: title.value, author: author.value, url: url.value }, props.user )
            
            props.handleNewBlog()

            props.setNotification(`${title.value} by ${author.value} added`)
            Object.keys(fields).forEach(key => fields[key].reset())
        } catch(error) {
            console.log(error)
            props.setNotification(error.response.data.error, { error: true })
        }
    }

    return (
        <div className='CreateNewBlogContainer'>
            <h2>create new</h2>
            <form className='CreateNewBlog' onSubmit={add}>
                <table>
                    <tbody>
                        {Object.keys(fields).map(key =>
                            <tr key={key}>
                                <td>{key}:</td>
                                <td>
                                    <input {...fields[key].getPropsForInputField()}/>
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

const mapDispatchToProps = {
    create,
    setNotification
}

export default connect(null, mapDispatchToProps)(CreateBlog)