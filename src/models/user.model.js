import mongoose from "mongoose";
 const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentID: { type: String, required: true, unique: true  },
    collegeCareer: { type: String, required: true },
    dateAdmission: { type: Date, required: true },
    //image: { data: Buffer, contentType: String }, // Campo de imagen como datos binarios
    //credential: { data: Buffer, contentType: String }
    available: { type: Boolean, default: true } // Nuevo campo para indicar disponibilidad
},{
    timestamps: true
});
// required para especificar si un campo es obligatorio, unique para asegurar que no haya duplicados
export default mongoose.model('User', userSchema )

