import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { log } from 'console'
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'
import notFoundRouter from './routes/not.found.route.js'
import cors from './middlewares/cors.middleware.js'
import globalErrorHandler from './middlewares/global.error.middleware.js'

dotenv.config()
const app = express()

app.use(cors)
app.use(express.json())

app.use(userRouter)
app.use(todoRouter)
app.use(notFoundRouter)

app.use(globalErrorHandler)

mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`).then(() => {
  log('db connecion is established')
  app.listen(process.env.PORT, () => {
    log('server has been started')
  })
})
