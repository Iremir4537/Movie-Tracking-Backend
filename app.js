import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv/config'

const app = express()

//Middlewares
app.use(cookieParser())
app.use(bodyParser.json())

app.listen(process.env.PORT || 5000,() => {
    console.log(`Server is running on Port ${process.env.PORT}.`)
})