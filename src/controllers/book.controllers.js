import Book from '../models/book.model.js';
import { UpImage, deleteImage } from '../cloudinary.js';
import { v4 as uuidv4 } from 'uuid';

export const getBooks = async (req, res) => {
  try {
    // Obtén todos los libros del usuario, excluyendo los datos de las imágenes
    const books = await Book.find({ user: req.user.id })
      .select('-images.data') // Excluye el campo 'data' del subdocumento 'images'
      .populate('user');

    res.json(books);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ message: 'Error al obtener libros' });
  }
};

export const createBook = async (req, res) => {
  // ---------------------------- TERMINADOOO
  if (!req.files) {
    return res.status(400).json({ success: false, message: 'No files provided.' });
  }

  try {
    const book = JSON.parse(req.body.book);
    const newBook = new Book({
      ...book,
      user: req.user.id,
      images: req.files.map((file) => ({
        name: `${uuidv4()}.${file.mimetype.split('/')[1]}`,
        data: file.buffer,
        contentType: file.mimetype,
      })),
    });

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ message: 'Error al crear libro' });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    console.error('Error al obtener libro:', error);
    res.status(500).json({ message: 'Error al obtener libro' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    if (book.image?.public_id) {
      await deleteImage(book.image.public_id);
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ message: 'Error al eliminar libro' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ message: 'Error al actualizar libro' });
  }
};

export const getBookByTag = async (req, res) => {
  try {
    const searchTags = req.body.tags; // Etiquetas proporcionadas en la solicitud de búsqueda
    // Realizar una consulta a la base de datos para encontrar libros que contengan al menos una de las etiquetas proporcionadas
    const books = await Book.find({ tags: { $in: searchTags } });

    // Verificar si se encontraron libros con las etiquetas proporcionadas
    if (books.length === 0) {
      // Si no se encontraron libros, devolver un mensaje de error
      return res.status(404).json({ message: 'No se encontraron libros con las etiquetas proporcionadas' });
    }

    // Devolver los libros encontrados como respuesta en formato JSON
    res.json(books);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la búsqueda de libros por etiquetas
    console.error('Error al obtener libros por etiquetas:', error);
    res.status(500).json({ message: 'Error al obtener libros por etiquetas' });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.term; // Término de búsqueda proporcionado en la consulta

    // Realizar una consulta a la base de datos para buscar libros que coincidan parcialmente con el término de búsqueda
    const books = await Book.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }, // Búsqueda por título
        { autor: { $regex: searchTerm, $options: 'i' } }, // Búsqueda por autor
      ],
    });

    // Verificar si se encontraron libros que coincidan con el término de búsqueda
    if (books.length === 0) {
      // Si no se encontraron libros, devolver un mensaje de error
      return res.status(404).json({ message: 'No se encontraron libros que coincidan con el término de búsqueda' });
    }

    // Devolver los libros encontrados como respuesta en formato JSON
    res.json(books);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la búsqueda de libros
    console.error('Error al buscar libros:', error);
    res.status(500).json({ message: 'Error al buscar libros' });
  }
};

//----------------- IMAGENES DE LIBROS ----------------

export const getImage = async (req, res) => {
  // Obtén el ID del libro y el nombre de la imagen de los parámetros
  const { bookId, imageName } = req.params;

  try {
    // Encuentra el libro por ID y asegúrate de que exista
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }

    // Busca la imagen por nombre dentro del array de imágenes del libro
    const image = book.images.find((img) => img.name === imageName);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found.' });
    }

    // Devuelve la imagen como un flujo de datos binarios
    res.set('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    res.status(500).json({ success: false, message: 'Error retrieving image' });
  }
};

//-------------------------FEEEEEEEEEEEED----------------
export const getRecentBooks = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos para obtener los libros más recientes
    const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(15); // Ordena por fecha de creación descendente y limita a 10 libros

    // Devuelve los libros encontrados como respuesta en formato JSON
    res.json(recentBooks);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la obtención de libros recientes
    res.status(500).json({ message: 'Error al obtener libros recientes' });
  }
};
