const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    app.listen(PORT, () => console.log(`Server listening at ${PORT}`))
}).catch((err) => {
    console.log(err)
})