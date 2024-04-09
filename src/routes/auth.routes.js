//Rutas

import { Router } from "express";
import {login,register,profile,checkToken} from "../controllers/auth.controller.js";
import {authRequired} from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validatesData.js';
import {registrerUserSchema, loginUserSchema} from '../Schemas/auth.schema.js';
import fileUpload from 'express-fileupload';

const router = Router();
//**IMPORTANTE** DESDE ZOD NO SE PUEDE VALIDAR LA IMAGEN ENTONCES HAY QUE CREAR OTRA FUNCION QUE VALIDE LA IMAGEN
router.post('/register', fileUpload({useTempFiles: true,tempFileDir:'./Uploads'}), validateSchema(registrerUserSchema), register);

router.post('/login', validateSchema(loginUserSchema), login);

//router.post('/logout', logout);

router.get('/profile', authRequired, profile);

router.post('/check', authRequired, checkToken);

export default router;
