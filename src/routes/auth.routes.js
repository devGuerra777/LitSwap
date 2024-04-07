//Rutas

import { Router } from "express";
import {login,register,profile,checkToken} from "../controllers/auth.controller.js";
import {authRequired} from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validatesData.js';
import {registrerUserSchema, loginUserSchema} from '../Schemas/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registrerUserSchema), register);

router.post('/login', validateSchema(loginUserSchema), login);

//router.post('/logout', logout);

router.get('/profile', authRequired, profile);

router.post('/check', authRequired, checkToken);

export default router;
