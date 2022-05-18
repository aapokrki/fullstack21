const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
if (process.argv.length == 4) {
  console.log('give number as argument')
  process.exit(1)
}


const password = process.argv[2]
const url =
  `mongodb+srv://krki:${password}@cluster0.7h50s.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
  
})
const Person = mongoose.model('Person', personSchema)

//Add person
if(process.argv.length === 5){
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

}

if(process.argv.length == 3){

  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}


