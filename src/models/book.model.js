import mongoose from "mongoose";

//coleccion de libros

const booksSchema = mongoose.Schema({
    title: {type: String, required:true},
    ISDN: {type: String, required: true, unique: true},
    edit: {type: String, required: true},
    autor: {type: String, required: true},
    sipnosis: {type: String, required: true},
    date: {type: Date, required: true}, //debe de ser de maximo 400 caracteres
    lenguage: {type: String, required: true},
    tags: {type: SVGStringList},
    image: { data: Buffer, contentType: String , required: true}
})

export default mongoose.model('book',booksSchema)