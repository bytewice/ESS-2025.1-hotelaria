//const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';  // ✅ Import CORS

import connectToMongoDB from './db/connectToMongoDB.js'

const app = express();
dotenv.config()

app.use(cors());

app.use(express.json())
app.use(cookieParser())

// Routes imports
import userPerfilRoutes from './routes/user_perfil.routes.js'
import userReservationRoutes from './routes/user_reservation.routes.js'
import pingRoutes from './routes/ping.routes.js'
import bookRoutes from './routes/books.routes.js'
import authRoutes from './routes/oldauth.routes.js'

app.use('/user', userPerfilRoutes)
app.use('/reservation', userReservationRoutes)
app.use('/ping', pingRoutes)
app.use('/books', bookRoutes)
app.use('/auth', authRoutes)

app.listen(4000, () => {
  //connectToMongoDB()
  console.log("Running at Port 4000")
});