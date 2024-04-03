//Rutas

import { Router } from "express";
import {login,register,logout,profile} from "../controllers/auth.controller.js";
import {authRequired} from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validatesData.js';
import {registrerUserSchema, loginUserSchema} from '../Schemas Valid/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registrerUserSchema), register);

router.post('/login', validateSchema(loginUserSchema), login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);

export default router;

