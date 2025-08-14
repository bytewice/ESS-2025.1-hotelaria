import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js'; // Importa a função de conexão

dotenv.config();

const app = express();
const PORT = process.env.PORT|| 2000; // Define a porta

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Importa as rotas
import userPerfilRoutes from './routes/user_perfil.routes.js';
import adminRoutes from './routes/admin-users.routes.js';
import attractionRoutes from './routes/attraction_routes.js';
import creditCardRoutes from './routes/credit_cards.routes.js'
import promotionRoutes from './routes/promotions.routes.js'
//import userReservationRoutes from './routes/user_reservation.routes.js' // Comentado, se não estiver em uso

import reservas from './routes/admin.reservation.routes.js';



// Usa as rotas

app.use('/attraction', attractionRoutes);
app.use('/user', userPerfilRoutes);
app.use('/admin', adminRoutes);
app.use('/credit_cards', creditCardRoutes)
app.use('/promotions', promotionRoutes)

import loginRoute from './routes/login.routes.js';
app.use('/login', loginRoute);

app.use('/admin',adminRoutes);
app.use('/reservas', reservas);
 // Se AdminRoutes for diferente de adminRoutes

// Exporta a instância do aplicativo Express para uso em testes
export default app;

// Inicia o servidor e conecta ao MongoDB APENAS se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
    connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

