import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import {getTasks,getTask,creatTask,deleteTask,updateTask} from '../controllers/tasks.controller.js';

//Rutas CRUD para tareas dentro de la página web

const router = Router();

router.get('/tasks', authRequired, getTasks);

router.get('/tasks/:id', authRequired, getTask);

router.post('/tasks', authRequired, creatTask);

router.delete('/tasks/:id', authRequired, deleteTask);

router.put('/tasks/:id', authRequired, updateTask);

export default router;