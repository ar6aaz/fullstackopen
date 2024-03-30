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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons',(request, response) => {
  Phonebook.find({}).then(persons => {
    response.json(persons)
})
})

app.get('/api/persons/:id',(request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      }
      else {
        response.status(404).end();
      }
    })
  .catch(error => next(error));
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(person => {
      response.status(204).end();
    })
    .catch(error => next(error));
})

app.get('/info', async (request, response) => {
  const count = await (await Phonebook.find({})).length
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  `)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
  }
  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  })

  phonebook.save().then(savedPhonebook => {
    response.json(savedPhonebook)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
} 
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('Server running on port 3001')