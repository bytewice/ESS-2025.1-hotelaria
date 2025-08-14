import express from 'express';
import { loginUser } from '../controllers/login.controllers.js';
//import {funções definidas no controler} from 'rota do arquivo no controler /reservation.controllers.js'

const router = express.Router()
/* JSON */

/* Rotas de Autenticação para Administradores */
router.post('/', loginUser); // Rota de login do administrador

export default router