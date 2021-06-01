// server.js
console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

// Middlewares and other routes here...

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))

    // All your handlers here...
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {res.render('index.ejs', { quotes: results })})
        .catch(error => console.error(error))
      // res.sendFile(__dirname + '/index.html')
      
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
      console.log(req.body)
    })

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
})
.catch(error => console.error(error))