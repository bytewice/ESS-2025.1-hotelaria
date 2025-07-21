//const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';  

import connectToMongoDB from './db/connectToMongoDB.js'

const app = express();
dotenv.config()

app.use(cors());

app.use(express.json())
app.use(cookieParser())

// Routes imports
import userPerfilRoutes from './routes/user_perfil.routes.js'
import adminRoutes from './routes/admin-users.routes.js'
import attractionRoutes   from './routes/Attraction_routes.js'
import userReservationRoutes from './routes/user_reservation.routes.js'
import AdminRoutes from './routes/admin.routes.js'

app.use('/attraction', attractionRoutes)
app.use('/user', userPerfilRoutes)
app.use('/admin', adminRoutes)
app.listen(3000, () => {
  connectToMongoDB()
  console.log("Running at Port 3000")
});