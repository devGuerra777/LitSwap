import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getBooks, getBook, createBook, deleteBook, updateBook, getBookByTag, searchBooks, getImage, getRecentBooks } from '../controllers/book.controllers.js';
import { CreateBook } from '../Schemas/auth.schema.js';
import { validateSchema } from '../middlewares/validatesData.js';
import fileUpload from 'express-fileupload';
import multer from 'multer';

const upload = multer();

//Rutas CRUD para libros dentro de la página web

const router = Router();

router.get('/books', authRequired, getBooks); //OBTENER LOS LIBROS del usuario

router.get('/books/:bookId/images/:imageName', getImage); //OBTENER LOS LIBROS del usuario

router.get('/books/search', authRequired, searchBooks); // Buscar libros por nombre o autor

router.get('/books/bytag', authRequired, getBookByTag); // Buscar libros por etiquetas

router.get('/book/:id', authRequired, getBook); //OBTENER UN LIBRO BUSCADO POR ID

router.post('/book', authRequired, upload.array('image', 3), /*validateSchema(CreateBook),*/ createBook); //CREAR UN LIBRO

router.delete('/book/:id', authRequired, deleteBook); //BORRAR UN LIBRO POR ID

router.put('/book/:id', authRequired, updateBook); //EDITAR UN LIBRO POR ID

// Ruta para obtener los libros más recientes (feed)
router.get('/feed', authRequired,getRecentBooks);


export default router;
