import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js'; // Importa a função de conexão

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000; // Define a porta

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Importa as rotas
import userPerfilRoutes from './routes/user_perfil.routes.js';
import adminRoutes from './routes/admin-users.routes.js';
import attractionRoutes from './routes/attraction_routes.js';
//import userReservationRoutes from './routes/user_reservation.routes.js' // Comentado, se não estiver em uso
import AdminRoutes from './routes/admin.routes.js';
<<<<<<< HEAD
import reservationRoutes from "./routes/admin.reservation.routes.js";
=======
import reservas from './routes/admin.reservation.routes.js';
>>>>>>> teste


// Usa as rotas
app.use('/attraction', attractionRoutes);
app.use('/user', userPerfilRoutes);
app.use('/admin', adminRoutes);
<<<<<<< HEAD
app.use('/admin', AdminRoutes); // Se AdminRoutes for diferente de adminRoutes
app.use("/reservas", reservationRoutes);
=======
app.use('/admin', AdminRoutes);
app.use('/reservas', reservas);
 // Se AdminRoutes for diferente de adminRoutes
>>>>>>> teste

// Exporta a instância do aplicativo Express para uso em testes
export default app;

// Inicia o servidor e conecta ao MongoDB APENAS se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
    connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

