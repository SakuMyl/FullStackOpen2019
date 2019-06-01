const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
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

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog.likes = blog.likes || 0
    
    if(!blog.title || !blog.url) {
        response.status(400).end()
    }
    blog.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const {author, title, url, likes} = request.body
    const blog = {
        author,
        title, 
        url, 
        likes
    }
    blog.likes = blog.likes || 0

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

blogsRouter.patch('/:id', (request, response, next) => {
    
    Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogsRouter