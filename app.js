import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
dotenv.config({ path: './config/.env'})

//DB Connection
connectDB()

const app = express()

//Middlewares
app.use(cookieParser())
app.use(bodyParser.json())
app.use(morgan('dev')) //HTTP Request Logger

//Routes
import authRoute from './routes/auth.js'

app.use('/auth',authRoute)

app.listen(process.env.PORT || 5000,() => {
    console.log(`Server is running on Port ${process.env.PORT}.`)
})