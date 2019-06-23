import React from 'react'
import { connect } from 'react-redux'
import { like, remove, comment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks';
import { Button, Form, Divider } from 'semantic-ui-react'

const Blog = props => {

    const blog = props.blog

    if(!blog) return null

    const comment = useField('text')

    const userOwns = blog.user.name === props.user.name
    const showWhenOwned = { display: userOwns ? '' : 'none' }

    const handleRemoval = async () => {
        try {
            if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                props.remove(blog.id)
                props.setNotification(`${blog.title} by ${blog.author} removed successfully`)
            }
        } catch(error) {
            props.setNotification(error.response.data.error, { error: true })
        }
    }

    const handleNewComment = (event) => {
        event.preventDefault()
        props.comment(comment.value, blog)
        comment.reset()
    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a>
            <div>
                <span>{blog.likes} likes</span>
                <Button compact size='tiny' onClick={() => props.like(blog)}>like</Button>
            </div>
            <div>Added by {blog.user.name}</div>
            <Button compact size='tiny' style={showWhenOwned} onClick={handleRemoval}>remove</Button>

            <Divider/>

            <h2>comments</h2>
            <Form onSubmit={handleNewComment}>
                <Form.Input width={5}>
                    <input {...comment.getPropsForInputField()}/>
                    <Form.Button type='submit'>add comment</Form.Button>
                </Form.Input>
            </Form>
            <ul>
                {blog.comments.map(comment =>
                    <li key={comment.id}>{comment.content}</li>
                )}
            </ul>
        </div>

    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs.find(b => b.id === ownProps.id),
        user: state.user
    }
}

const mapDispatchToProps = {
    like,
    remove,
    comment,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)