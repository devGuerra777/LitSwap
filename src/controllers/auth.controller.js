import User from "../models/user.model.js"
import Book from '../models/book.model.js';
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req,res) =>{
    const {email, password, username, studentID,collegeCareer,dateAdmission} = req.body
    // Convertir la cadena de texto de dateAdmission a un objeto Date
    const dateAdmissionDate = new Date(dateAdmission);

    try {

        const passwordHash = await bcrypt.hash(password,10) //pasamos contraseña y el numero de veces q se ejecuta el algoritmo

        const newUser = new User({
            username,
            email,
            password:passwordHash,
            studentID,
            collegeCareer,
            dateAdmission: dateAdmissionDate // Usar el objeto Date convertido
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id}) //creacion y guardado del token con el metodo en jws.js

        res.cookie('token',token);//establecemos una cookie q se va llamar token, el valor es el token q hemos creado
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const login = async (req,res) =>{
    const {email, password} = req.body;

    try {
        
        const userFound = await User.findOne({email}) //busca un usuario en la base de datos utilizando su dirección de correo electrónico y guarda el resultado de la búsqueda en la variable userFound
        if(!userFound) return res.status(400).json({message:"User not found"});//sino se encontro el usuario
        //si si se encontro el usuario:
        const isMatch = await bcrypt.compare(password, userFound.password) //compara la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos 
        
        if(!isMatch) return res.status(400).json({message:"Invalidated credentials"}); //si el usuario no coincide

        const token = await createAccessToken({id: userFound._id}) //creacion y guardado del token con el metodo en jws.js

        res.cookie('token',token);//establecemos una cookie q se va llamar token, el valor es el token q hemos creado
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const logout = (req,res) =>{
    res.cookie('token', "", {
        expires: new Date (0)
    })
    return res.sendStatus(200)
}


/*  Aqui despues de ejecutar la funcion de la validacion del token se evalua si esta el usuario en la base de datos 
    si esta entonces reponde con la informacion del usuario. 
*/
export const profile = async (req, res) => {
    try {
        // Busca el usuario por su ID
        const userFound = await User.findById(req.user.id);
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        // Busca los libros asociados al usuario por su ID
        const userBooks = await Book.find({ user: req.user.id });

        // Construye la respuesta con la información del usuario y sus libros
        const response = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            studentID: userFound.studentID,
            collegeCareer: userFound.collegeCareer,
            dateAdmission: userFound.dateAdmission,
            books: userBooks // Añade los libros asociados al usuario
        };

        // Retorna la respuesta en formato JSON
        res.json(response);
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};


export const toggleUserAvailability = async (req, res) => { //ALTERNAR DISPONIBILIDAD DE USUARIO hacerlo no disponible
    const { userId } = req.params;

    try {
        // Buscar el usuario por su ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Cambiar la disponibilidad del usuario
        user.available = !user.available; // Invertir la disponibilidad (toggle)

        // Guardar los cambios en la base de datos
        await user.save();

        res.json({ message: 'Disponibilidad de usuario actualizada correctamente', user });
    } catch (error) {
        console.error('Error al actualizar la disponibilidad del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar la disponibilidad del usuario' });
    }
};

export const makeUserAvailable = async (req, res) => { //HACER USUARIO AVAILABLE(DISPONIBLE) DE NUEVO
    const { userId } = req.params;

    try {
        // Buscar el usuario por su ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Hacer que el usuario esté disponible nuevamente
        user.available = true;

        // Guardar los cambios en la base de datos
        await user.save();

        res.json({ message: 'Usuario marcado como disponible nuevamente', user });
    } catch (error) {
        console.error('Error al hacer disponible nuevamente al usuario:', error);
        res.status(500).json({ message: 'Error al hacer disponible nuevamente al usuario' });
    }
};

