import mongoose from "mongoose";

//coleccion de libros

<<<<<<< HEAD
const booksSchema = new mongoose.Schema({
    title: {type: String, required:true},
    ISBN: {type: String, required: true, unique: true},
=======
const booksSchema = mongoose.Schema({
    title: {type: String, required:true},
    ISDN: {type: String, required: true, unique: true},
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4
    edit: {type: String, required: true}, //editorial
    autor: {type: String, required: true},
    sipnosis: {type: String, required: true}, //debe de ser de maximo 400 caracteres
    date: {type: Date, required: true}, 
<<<<<<< HEAD
    language: {type: String, required: true},
    user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    tags: [String],
    //image: { data: Buffer, contentType: String , required: true}
},  
{
    timestamps: true,
=======
    lenguage: {type: String, required: true},
    tags: {type: SVGStringList},
    image: { data: Buffer, contentType: String , required: true}
>>>>>>> bd9a86ed218b3161c4d2ec243857739e38f00aa4
});

export default mongoose.model('book',booksSchema)