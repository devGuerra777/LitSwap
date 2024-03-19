import mongoose from "mongoose";

 const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentID: { type: String, required: true, unique: true  },
    collegeCareer: { type: String, required: true },
    dateAdmission: { type: Date, required: true },
    image: { data: Buffer, contentType: String }, // Campo de imagen como datos binarios
    credential: { data: Buffer, contentType: String }
});
// required para especificar si un campo es obligatorio, unique para asegurar que no haya duplicados
export default mongoose.model('User', userSchema )

// colección de los libros
const booksSchema = mongoose.Schema({
    name: {type: String, required:true},
    autor: {type: String, requered: true},
    desc: {type: String, requered: true},
    image: { data: Buffer, contentType: String , requered: true},
    
})
    
const 