// Importar los módulos necesarios
import express, { json } from "express"; // Importa Express y el método json
import morgan from "morgan"; // Importa el middleware de logging morgan
import cookieParser from 'cookie-parser'; // Importa el middleware para manejar cookies

import authRoutes from "./routes/auth.routes.js"; // Importa las rutas relacionadas con la autenticación
import bookRoutes from "./routes/book.routes.js"; // Importa las rutas relacionadas con los libros

// Crear una instancia de Express
const app = express();

// Configurar middleware
app.use(morgan('dev')); // Configura el middleware de logging con el formato 'dev'
app.use(express.json()); // Configura Express para parsear el cuerpo de las solicitudes en formato JSON
app.use(cookieParser()); // Configura Express para usar el middleware de manejo de cookies

// Configurar las rutas
app.use("/api", authRoutes); // Configura las rutas de autenticación bajo la ruta base "/api"
app.use("/api", bookRoutes); // Configura las rutas de libros bajo la ruta base "/api"

// Exportar la aplicación Express configurada
export default app;
