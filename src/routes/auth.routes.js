<<<<<<< HEAD
//Rutas

import { Router } from "express";
import {login,register,logout,profile} from "../controllers/auth.controller.js";
import {authRequired} from '../middlewares/validateToken.js';

const router = Router();

router.post('/register',register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);

export default router;
=======
import { Router } from "express";
import {login,register,logout} from "../controllers/auth.controller.js";

const router = Router();

router.post('/register',register)

router.post('/login', login)

router.post('/logout', logout)

export default router
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4
