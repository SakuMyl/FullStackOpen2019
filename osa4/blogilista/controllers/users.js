const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {user: 0, likes: 0})
    response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)
        if(user) {
            response.json(user.toJSON())
        } else {
            response.status(404).end()
        }
    } catch(error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if(!body.password || body.password.length < 3) {
            response.status(400).json({ error: "password missing or too short (must be at least 3 characters long)" })
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                passwordHash,
                name: body.name
            })

            const savedUser = await user.save()

            response.json(savedUser.toJSON())
        }
    } catch(error) {
        next(error)
    }
})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch(error) {
        next(error)
    }
})
module.exports = usersRouter