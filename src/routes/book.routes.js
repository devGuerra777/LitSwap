import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import {getBooks,getBook,createBook,deleteBook,updateBook, getBookByTag,searchBooks} from '../controllers/book.controllers.js';

//Rutas CRUD para libros dentro de la página web

const router = Router();

router.get('/books', authRequired, getBooks); //OBTENER LOS LIBROS

router.get('/books/search', authRequired, searchBooks); // Buscar libros por nombre o autor

router.get('/books/bytag', authRequired, getBookByTag); // Buscar libros por etiquetas

router.get('/books/:id', authRequired, getBook); //OBTENER UN LIBRO BUSCADO POR ID

router.post('/books', authRequired, createBook); //CREAR UN LIBRO

router.delete('/books/:id', authRequired, deleteBook); //BORRAR UN LIBRO POR ID

router.put('/books/:id', authRequired, updateBook);  //EDITAR UN LIBRO POR ID



export default router;