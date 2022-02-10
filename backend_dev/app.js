
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()
require('./database/db');

const indexRouter = require('./route/index')
const rRouter = require('./route/r')


const app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(express.json())
const port = process.env.PORT || 8000

app.use('/api',indexRouter);
app.use('/',rRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
