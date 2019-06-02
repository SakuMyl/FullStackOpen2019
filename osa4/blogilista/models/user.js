const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    passwordHash: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    blogs: [
        {
            ref: 'Blog',
            type: mongoose.Schema.Types.ObjectId
        }
    ]

})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)