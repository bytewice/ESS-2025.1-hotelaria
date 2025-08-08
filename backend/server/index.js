//const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';  // ✅ Import CORS

import connectToMongoDB from './db/connectToMongoDB.js'

const app = express();
dotenv.config()

app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())

// Routes imports
import userPerfilRoutes from './routes/user_perfil.routes.js'
import adminRoutes from './routes/admin-users.routes.js'

app.use('/user', userPerfilRoutes)
app.use('/admin', adminRoutes)

// Apenas inicie o servidor se o arquivo for o ponto de entrada principal
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    connectToMongoDB()
    console.log("Running at Port 3000")
  });
}

export default app