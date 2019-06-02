const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

    const body = request.body
    const user = User.findOne({username: body.username})

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if(!user || !passwordCorrect) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userFromToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userFromToken, process.env.SECRET)

    response
        .status(200)
        .json({ token, username: user.username, name: user.name})
})

module.exports = loginRouter