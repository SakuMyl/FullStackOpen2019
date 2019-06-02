const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {

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

    test('id is defined correctly in the response', async () => {

        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined
            expect(blog._id).not.toBeDefined
        })
    })

    describe('addition of a new blog', () => {

        test('succeeds with valid data', async () => {

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

            const blogsAfterUpdate = await helper.blogsInDb()

            const contents = blogsAfterUpdate.map(b => {
                return {
                    title: b.title,
                    author: b.author,
                    url: b.url,
                    likes: b.likes
                }
            })
            expect(blogsAfterUpdate.length).toBe(helper.initialBlogs.length + 1)
            expect(contents).toContainEqual(blog)
        })

        test('succeeds with valid data when \'likes\' is not defined', async () => {

            const blog = {
                title: "A title that no other blog is supposed to have",
                author: "testblogger",
                url: "http://testblogger.com"
            }

            const response = await api
                .post('/api/blogs')
                .send(blog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.likes).toBe(0)
        })

        test('returns status code 400 when title or url is missing', async () => {

            const blogWithoutUrl = {
                title: "A title that no other blog is supposed to have",
                author: "testblogger",
            }
            const blogWithoutTitle = {
                author: "testblogger",
                url: "http://testblogger.com"
            }

            await api
                .post('/api/blogs')
                .send(blogWithoutUrl)
                .expect(400)

            await api
                .post('/api/blogs')
                .send(blogWithoutTitle)
                .expect(400)
        })
    })

    describe('deletion of a blog', () => {

        test('succeeds with status code 204 when id is valid', async () => {

            const blogsInStart = await helper.blogsInDb()
            const blogToDelete = blogsInStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

        })
    })

    describe('modification of a blog', () => {

        test('succeeds with valid data', async () => {

            const blogsInStart = await helper.blogsInDb()
            const blogToPatch = blogsInStart[0]

            const modification = { likes: 15 }

            await api
                .patch(`/api/blogs/${blogToPatch.id}`)
                .send(modification)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsInEnd = await helper.blogsInDb()

            expect(blogsInEnd[0].likes).toBe(15)
        })
    })

})

describe('users', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    })
    test('succeeds when adding a valid user', async () => {

        const usersInStart = await helper.usersInDb()

        const user = {
            username: "validUserTest",
            password: "secret",
            name: "a very beautiful name"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersInEnd = await helper.usersInDb()

        expect(usersInEnd.length).toBe(usersInStart.length + 1)
        expect(usersInEnd.map(u => u.username)).toContain(user.username)
    })
    test('returns status code 400 when trying to add invalid user', async () => {

        const usersInStart = await helper.usersInDb()
        const invalidUsers = [
            {
                username: "invalidPasswordUser",
                password: "se",
                name: "a very creative name"
            },
            {
                username: "in",
                password: "secret",
                name: "an unnecessarily long name which should not be used in these tests"
            },
            {
                password: "secret",
                name: "usernamemissing"
            },
            {
                username: "passwordmissinguser",
                name: "asdfasdfasdfasdf"
            },
            {
                username: "namemissinguser",
                password: "secret"
            }
        ]

        for(let user of invalidUsers) {
            await api
                .post('/api/users')
                .send(user)
                .expect(400)
        }

        const usersInEnd = await helper.usersInDb()
        expect(usersInEnd.length).toBe(usersInStart.length)
    })

    test('returns status code 400 when adding a user with non-unique name', async () => {

        const usersInStart = await helper.usersInDb()
        const validUser = {
            username: "ValidUser",
            password: "secret",
            name: "Iverunoutofnames"
        }
        await api
            .post('/api/users')
            .send(validUser)
            .expect(200)

        const response = await api
            .post('/api/users')
            .send(validUser)
            .expect(400)

        expect(response.body.error).toBe('username must be unique')

        const usersInEnd = await helper.usersInDb()

        expect(usersInEnd.length).toBe(usersInStart.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})