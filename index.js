const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>bye world</h1>')
})
app.get('/info', (request, response) => {
    const numPeople = persons.length
    const date = new Date()
    const sendString = `<p>Phonebook has info for ${numPeople} people<br/>${date}</p>`
    response.send(sendString)
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
        return response.json(person)
    }
    else {
        return response.status(404).json({
            error: `person with id ${id} could not be found`
        })
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    const found = persons.find(p => p.name === body.name)

    //if name or number field missing or person already exists
    if (!body.name) {
        return response.status(400).json({
            error: "missing name"
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: "missing number"
        })
    }
    if (found) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor((Math.random()*10000))
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
