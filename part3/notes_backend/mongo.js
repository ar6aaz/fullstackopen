const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
   `mongodb+srv://ar6aaz:${password}@cluster0.wbgwref.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'GET and POST are the most important methods of HTTP protocol',
  important: true,
})


// 1. Add new note

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
/*
2. Get all notes

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })


3. Get all notes with important: true

Note.find({important: true}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })*/

/*
  How to run:
> node mongo.js YOUR_MONGO_PASSWORD

  */

