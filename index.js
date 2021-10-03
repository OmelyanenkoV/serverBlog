const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const key = require('./keys')
const authRoutes = require('./routes/auth.routes')

const app = express()

const PORT = 5000

mongoose.connect(key.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => console.error(e))

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// router
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`The server listens on port ${PORT} .....`))



