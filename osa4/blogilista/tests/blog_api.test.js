const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = helper.initialBlogs.map(blog => new Blog(blog))

    const promiseArr = blogs.map(blog => blog.save())

    await Promise.all(promiseArr)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('id is defined correctly', async () => {

    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined
        expect(blog._id).not.toBeDefined
    })
})

test('new blog can be added to database', async () => {

    const blog = {
        title: "A title that no other blog is supposed to have",
        author: "testblogger",
        url: "http://testblogger.com",
        likes: 10,
    }
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await api.get('/api/blogs')
    
    const contents = blogsAfterUpdate.body.map(b => {
        return {
            title: b.title, 
            author: b.author, 
            url: b.url, 
            likes: b.likes
        }
    })
    expect(blogsAfterUpdate.body.length).toBe(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual(blog)
})

afterAll(() => {
    mongoose.connection.close()
})