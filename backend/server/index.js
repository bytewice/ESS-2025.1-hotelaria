import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectToMongoDB from './db/connectToMongoDB.js'

// Rotas
import userPerfilRoutes from './routes/user_perfil.routes.js'
import adminRoutes from './routes/admin-users.routes.js'
import conteudoRoutes from './routes/conteudo.routes.js' // Nova rota

const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

// Rotas
app.use('/user', userPerfilRoutes)
app.use('/admin', adminRoutes)
app.use('/api/quartos', conteudoRoutes) // Nova rota

app.listen(3000, () => {
  connectToMongoDB()
  console.log("Servidor rodando na porta 3000")
});

export default app; // <-- Adicione esta linha