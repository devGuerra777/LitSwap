//Configuracion todo el codigo del backend
import express, { json } from "express";
import morgan from "morgan";
<<<<<<< HEAD
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
=======
import authRoutes from "./routes/auth.routes.js"
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4

 const app = express();

app.use(morgan('dev'));
app.use(express.json());
<<<<<<< HEAD
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",bookRoutes);
=======

app.use("/api",authRoutes);
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4

 export default app;