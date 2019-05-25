const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Give password as a parameter')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sakumyl:${password}@fullstackopen-apu3e.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, {useNewUrlParser: true})
        .catch(err => 
            console.log('Could not connect to database', err)
        )

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    console.log('puhelinluettelo:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
} else {
    const name = process.argv[3]
    const number = process.argv[4]
    if(!name || !number) {
        console.log('please give name and number to add a new person')
        mongoose.connection.close()
        process.exit(1)
    } else {
        const person = new Person({
            name,
            number
        })
        person.save().then(result => {
            console.log(`lisättiin ${name} numero ${number} luetteloon`)
            mongoose.connection.close()
        })
    }

}
