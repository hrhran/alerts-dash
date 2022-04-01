const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
//const { errorHandler } = require('./middleware/error')
const connectToDatabase = require('./config/database')
const port = process.env.PORT || 5000

connectToDatabase()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/api', require('./routes/alertRoutes'))


//app.use(errorHandler)

app.listen(port, () => console.log(`Backend running on localhost:${port}`))
