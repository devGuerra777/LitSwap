import Book from '../models/book.model.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user.id }).populate('user');
        res.json(books);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ message: 'Error al obtener libros' });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, ISBN, edit, autor, sipnosis, date, language, tags } = req.body;
        const newBook = new Book({
            title,
            ISBN,
            edit,
            autor,
            sipnosis,
            date,
            language,
            tags,
            user: req.user.id
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
                { autor: { $regex: searchTerm, $options: 'i' } } // Búsqueda por autor
            ]
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