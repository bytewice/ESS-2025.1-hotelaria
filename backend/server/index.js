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
import atraçõesRoutes   from './routes/atrações_routes.js'
//import userReservationRoutes from './routes/user_reservation.routes.js'
//import AdminRoutes from './routes/admin.routes.js'
app.use('/atrações', atraçõesRoutes)
app.use('/user', userPerfilRoutes)
//app.use('/reservation', userReservationRoutes)

app.listen(4000, () => {
  connectToMongoDB()
  console.log("Running at Port 4000")
});