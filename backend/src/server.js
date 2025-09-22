import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser' //to check the jwt token for autho which is present inside req.cookie

import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`)
  connectDB()
})

app.use("/api/auth", authRoutes)
