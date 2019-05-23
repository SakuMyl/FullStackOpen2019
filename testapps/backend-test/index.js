
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const Note = require('./models/note')

app.use(bodyParser.json())

app.use(morgan('tiny'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})
app.get('/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note.toJSON())
  })
})

app.delete('/notes/:id', (request, response) => {
    Note.deleteOne({_id: request.params.id})
        .then(result => 
          response.status(204).end()
        )
});

app.post('/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote.toJSON())
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })