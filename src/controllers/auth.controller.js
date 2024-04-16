import User from "../models/user.model.js"
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
            dateAdmission: dateAdmissionDate,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id}) //creacion y guardado del token con el metodo en jws.js
        
        res.json({
            user: userSaved,
            token: token,
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const UpdateImg = async (req, res) => {
    // Verifica si se han proporcionado archivos en la solicitud
    if (!req.files) {
      return res.status(400).json({ success: false, message: 'No files provided.' });
    }
    try {
      // Crea un nuevo objeto de imagen para cada archivo
      const newImages = req.files.map((file) => ({
        name: `${uuidv4()}.${file.mimetype.split('/')[1]}`, // Genera un nombre único para el archivo
        data: file.buffer, // Los datos del archivo (probablemente una imagen) en forma de búfer
        contentType: file.mimetype, // El tipo de contenido del archivo (por ejemplo, image/jpeg)
      }));
  
      // Actualiza el usuario en la base de datos
      const user = await User.findByIdAndUpdate(req.params.id, { $push: { images: newImages } }, { new: true });
      // Si no se encuentra el usuario, devuelve una respuesta con un estado 404
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
      // Manejo de errores: devuelve una respuesta con un estado 500 y un mensaje de error
      res.status(500).json({ message: error.message });
    }
  };

export const login = async (req,res) =>{
    const {email, password} = req.body;

    try {
        
        const userFound = await User.findOne({email}) //busca un usuario en la base de datos utilizando su dirección de correo electrónico y guarda el resultado de la búsqueda en la variable userFound
        if(!userFound) return res.status(400).json({message:"User not found"});//sino se encontro el usuario
        //si si se encontro el usuario:
        const isMatch = await bcrypt.compare(password, userFound.password) //compara la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos 
        
        if(!isMatch) return res.status(400).json({message:"Invalidated credentials"}); //si el usuario no coincide

        const token = await createAccessToken({id: userFound._id}) //creacion y guardado del token con el metodo en jws.js

        //res.cookie('token',token);//establecemos una cookie q se va llamar token, el valor es el token q hemos creado
        res.json({
            user: userFound,
            token: token,
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

/*  Aqui despues de ejecutar la funcion de la validacion del token se evalua si esta el usuario en la base de datos 
    si esta entonces reponde con la informacion del usuario. 
*/
export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id)
    if(!userFound)
    {
        return res.status(400).json({message: "User not found"});
    }
    try {
        const books = await Book.find({ user: userFound });
        res.json(books);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ message: 'Error al obtener libros' });
    }
    return res.json({
        user: userFound
    })
}

export const checkToken = async (req,res) =>{
    const userFound = await User.findById(req.user.id);

    if(!userFound)
    {
        return res.status(400).json({message: "User not found"});
    }
    return res.json({
        user: userFound
    })
}
