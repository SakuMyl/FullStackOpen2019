const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if(blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch(error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    
    const users = await User.find({})
    const user = users[0]

    const body = {...request.body, user: user._id}
    const blog = new Blog(body)

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch(error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(error) {
        next(error)
    }
})

blogsRouter.patch('/:id', async (request, response, next) => {

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
        response.json(updatedBlog.toJSON())
    } catch(error) {
        next(error)
    }
})

module.exports = blogsRouter