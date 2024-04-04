// Función middleware para validar un esquema utilizando Zod
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Intenta analizar el cuerpo de la solicitud (req.body) utilizando el esquema proporcionado
        schema.parse(req.body);
        // Si la validación tiene éxito, pasa al siguiente middleware o controlador de ruta
        next();
    } catch (error) {
        // Si ocurre un error durante la validación del esquema
        // Devuelve una respuesta de error con un código de estado 400 (Bad Request)
        // y un JSON que contiene los mensajes de error generados por Zod
        return res.status(400).json({ error: error.errors.map(error => error.message) });
    }
};