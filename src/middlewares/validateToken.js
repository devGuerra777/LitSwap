import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
  // Obtenemos el token del encabezado de autorización
  const token = req.headers.authorization?.split(' ')[1];

  // Verificamos si hay un token
  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verificamos el token con la clave secreta
    const user = jwt.verify(token, TOKEN_SECRET);
    req.user = user;
    next(); // Pasamos al siguiente middleware
  } catch (err) {
    // Si hay un error en la verificación del token, lo manejamos aquí
    return res.status(403).json({ message: 'Invalid Token' });
  }
};
