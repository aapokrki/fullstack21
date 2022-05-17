const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5354678"
  },
  {
    id: 3,
    name: "Aapo Kärki",
    number: "0503752001"
  },
  {
    id: 4,
    name: "Joonas Kauppakassi",
    number: "060-606666"
  },
]

//3.7-3.8
morgan.token('person', (request, response) =>{
  const bodyString = JSON.stringify(request.body)
  if(bodyString === '{}'){
    return ' '
  }
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.json())

app.get('/', (request,response) => {
  response.send('<h1>Hello World!</h1>')
})

// 3.1
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//3.2
app.get('/info', (request,response) => {
  const infoText = `<h2>Phonebook has info for ${persons.length} people</h2><h3>${new Date()}</h3>`
  response.send(peopleInfo)
})

//3.3
app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
})

//3.4
app.delete('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end
})

//3.5
app.post('/api/persons', (request,response) => {
  const body = request.body

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

  //3.6
  if(persons.filter(p => p.name === body.name).length > 0){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: getRandomInt(0, 5000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

const getRandomInt = ((min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

}) 
  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})