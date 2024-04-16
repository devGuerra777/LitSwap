//Configuracion todo el codigo del backend
import express, { json } from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";

 const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => { res.send('asdasda'); });

app.use("/api",authRoutes);
app.use("/api",bookRoutes);

 export default app;