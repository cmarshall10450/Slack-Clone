import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import Promise from 'bluebird'

const PORT = 5000
const MONGO_URI = 'mongodb://localhost/slack'

const app = express()

app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = Promise
mongoose.connect(MONGO_URI, { useMongoClient: true }).then(
  () => {
    console.log('Connected to DB')
    console.log('Starting server...')
    app.listen(PORT, () => console.log('Server running on port:', PORT))
  },
  err => {
    console.log(err)
  }
)
