const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sakumyl:${password}@fullstackopen-apu3e.mongodb.net/note-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })
        .catch(err => 
            console.log('Unable to connect', err)
        )

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
