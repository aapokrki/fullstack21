require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const { request, response } = require('express')

//3.7-3.8
morgan.token('person', (request, response) =>{
  const bodyString = JSON.stringify(request.body)
  if(bodyString === '{}'){
    return ' '
  }
  return JSON.stringify(request.body)
})

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.use(cors())

app.use(express.static('build'))


app.get('/', (request,response) => {
  response.send('<h1>Hello World!</h1>')
})

// 3.1
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//3.2
app.get('/info', (request,response,next) => {
  Person.find({}).then(people => {
    response.send(
      `<h2>Phonebook has info for ${people.length} people</h2><h3>${new Date()}</h3>`
    )
  })
  .catch(error => next(error))
})

//3.3
app.get('/api/persons/:id', (request,response,next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request,response,next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// ADD PERSON
app.post('/api/persons', (request,response) => {
  const body = request.body
  //console.log(body.name)

  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if(!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }


  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson =>{
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})