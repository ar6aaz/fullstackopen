const mongoose = require('mongoose')

const password = process.argv[2]

const url =
   `mongodb+srv://ar6aaz:${password}@cluster0.k8inx3i.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length > 4) {
        const phonebookItem = new Phonebook({
            name: process.argv[3],
            number: process.argv[4],
        })

        phonebookItem.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
        })
    }
    else{
        Phonebook.find(({})).then( result => {
            result.forEach(phonebookEntry => {
                console.log(phonebookEntry)
              })
            mongoose.connection.close()
        })
    }
    
