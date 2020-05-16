const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(userRouter)
app.use(productRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})