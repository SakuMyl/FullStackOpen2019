const config = require('../utils/config')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
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

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response, next) => {

    const token = getTokenFrom(request)

    try {
        const tokenDecoded = jwt.verify(token, config.SECRET)
        console.log(tokenDecoded)
        if(!token || !tokenDecoded.id) {
            return response.status(401).json({error: 'token missing or invalid'})
        }
        
        const user = await User.findById(tokenDecoded.id)

        const body = { ...request.body, user: user._id }
        const blog = new Blog(body)
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