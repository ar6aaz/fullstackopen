require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')
const app = express()

app.use(cors())
app.use(express.static('dist'))

// app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

app.use(express.json())

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons',(request, response) => {
  Phonebook.find({}).then(notes => {
    response.json(notes)
})
})

app.get('/api/persons/:id',(request, response) => {
  Phonebook.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

const generateId = () => {
  return Math.floor(Math.random() * Date.now())
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
  }

  // if(persons.find(person => person.name === body.name)){
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   })
  // }
  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  })

  phonebook.save().then(savedPhonebook => {
    response.json(savedPhonebook)
  })

  // persons = persons.concat(person)
  // response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('Server running on port 3001')