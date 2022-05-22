require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const mongoose = require('mongoose')

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

// GET ALL PERSONS
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// INFO
app.get('/info', (request,response,next) => {
  Person.find({}).then(people => {
    response.send(
      `<h2>Phonebook has info of ${people.length} people</h2><h3>${new Date()}</h3>`
    )
  })
  .catch(error => next(error))
})

// GET ONE PERSON
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

// DELETE PERSON
app.delete('/api/persons/:id', (request,response,next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// ADD PERSON
app.post('/api/persons', (request,response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
  .then(savedPerson =>{
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

// UPDATE NUMBER
// app.put('/api/persons/:id', (request, response, next) => {

//   const body = request.body;

//   const person = {
//     name: body.name,
//     number: body.number
//   }

//   Person.findByIdAndUpdate(request.params.id, person, {new: true})
//     .then(updatePerson => {
//       response.json(updatePerson)
//     })
//     .catch(error => next(error))

// })

app.put('/api/persons/:id', (request, response, next) => {

  const {name, number} = request.body

    console.log(request.params.id)

    Person.findByIdAndUpdate(
      request.params.id, 
      {name, number},
      {new: true, runValidators: true, context: 'query'})
      .then(updatePerson => {
        console.log(updatePerson)
        response.json(updatePerson)
      })
      .catch(error => next(error))
  
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint);


const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }else if (error.name === 'ValidationError') {
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})