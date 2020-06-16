const express = require('express')
require('./db/mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const app = express()

app.use((req, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  response.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });
app.use(express.json())
app.use(cookieParser())

app.use(userRouter)
app.use(productRouter)

module.exports = app
