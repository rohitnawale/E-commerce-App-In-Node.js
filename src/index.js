const express = require('express')
require('./db/mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const app = express()


app.use(express.json())
app.use(cookieParser())

app.use(userRouter)
app.use(productRouter)

module.exports = app
