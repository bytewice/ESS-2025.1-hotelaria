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
import adminRoutes from './routes/admin-users.routes.js'
import reservationRoutes from "./routes/admin.reservation.routes.js";

app.use('/user', userPerfilRoutes)
app.use('/admin', adminRoutes)
app.use("/reservas", reservationRoutes);

app.listen(3000, () => {
  connectToMongoDB()
  console.log("Running at Port 3000")
});
