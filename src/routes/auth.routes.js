//Rutas

import { Router } from "express";
import {login,register,logout,profile,toggleUserAvailability, makeUserAvailable} from "../controllers/auth.controller.js";
import {authRequired} from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validatesData.js';
import {registrerUserSchema, loginUserSchema} from '../Schemas Valid/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registrerUserSchema), register);

router.post('/login', validateSchema(loginUserSchema), login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);
///////////////////////////////////////////////////////PENDIENTES RUTAS PROTEGIDAS 
// Ruta para actualizar la disponibilidad de un usuario
router.put('/users/:userId/availability', toggleUserAvailability);

// Nueva ruta para hacer disponible nuevamente a un usuario
router.put('/users/:userId/make-available', makeUserAvailable);

export default router;

